import { NextFunction, Request, Response } from 'express';
import config from '../config/config';
import MongoRepository from '../repository/mongo.repository';
import User from '../components/user/model/User';
import ApiError from '../utils/ApiError';
import * as httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import TokenService from '../services/token.service';

export default class AuthMiddleware {
  private userRepository: MongoRepository;
  private tokenService: TokenService;
  constructor() {
    this.userRepository = new MongoRepository(User);
    this.tokenService = new TokenService();
    this.protect = this.protect.bind(this);
  }

  public async protect(req: Request | any, res: Response, next: NextFunction) {
    try {
      let token;
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
      }
      if (req.headers.cookie && req.headers.cookie.startsWith('jwt')) {
        token = req.headers.cookie.split('=')[1];
      }
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not logged in! Please log in to get access.');
      }

      const decoded = jwt.verify(token, config.jwt.secret);

      if (!decoded) {
        throw new ApiError(httpStatus.NOT_ACCEPTABLE, 'Token is not valid');
      }
      const currentUser = await this.userRepository.findByID(decoded.sub as string);

      if (!currentUser) {
        throw new ApiError(httpStatus.NOT_FOUND, 'The user belonging to this token does no longer exist.');
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //   @ts-ignore
      if (currentUser.changedPasswordAfter(decoded.iat)) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'User recently changed password! Please log in again.');
      }
      req.user = currentUser;
      next();
    } catch (error) {
      next(error);
    }
  }
  public restrictTo(...roles: string[]) {
    return (req: Request | any, res: Response, next: NextFunction) => {
      try {
        if (!roles.includes(req.user.role)) {
          throw new ApiError(httpStatus.FORBIDDEN, 'You do not have permission to perform this action');
        }
        next();
      } catch (error) {
        next(error);
      }
    };
  }
}
