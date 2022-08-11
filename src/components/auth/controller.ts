import { NextFunction, Request, Response } from 'express';
import * as httpStatus from 'http-status';
import ApiError from '../../utils/ApiError';
import Auth from '../../services/auth.service';
import catchAsync from '../../utils/catchAsync';
import TokenService from '../../services/token.service';

export default class AuthController {
  private authService: Auth;
  private tokenService: TokenService;

  constructor() {
    this.authService = new Auth();
    this.tokenService = new TokenService();
  }

  public signup = catchAsync(async (req: Request, res: Response) => {
    const user = await this.authService.signup(req.body);
    if (!user) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Registration Failed');
    const tokens = await this.tokenService.generateAuthTokens(user);
    res.send({ user, tokens });
  });

  public login = catchAsync(async (req: Request, res: Response) => {
    const user = await this.authService.loginWithEmail(req.body);
    const token = await this.tokenService.generateAuthTokens(user);
    if (!user) throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Registration Failed');
    res.send({ user, token });
  });
}
