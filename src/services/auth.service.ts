import MongoRepository from '../repository/mongo.repository';
import User from '../components/user/model/User';
import IUser from '../components/user/model/IUser';
import ApiError from '../utils/ApiError';
import * as httpStatus from 'http-status';
import { validateSignup } from '../utils/Validators';
import tokenTypes from '../config/tokens';
import TokenService from './token.service';
import Token from '../components/token/token';

export default class Auth {
  private userRepository: MongoRepository;
  private tokenService: TokenService;
  constructor() {
    this.userRepository = new MongoRepository(User);
    this.tokenService = new TokenService();
    this.signup = this.signup.bind(this);
  }

  public async signup(credentials: Partial<IUser>) {
    const validateResult = await validateSignup(credentials);
    if (!validateResult) return validateResult;
    const user = await this.userRepository.createOne(validateResult);
    return user;
  }

  public async loginWithEmail(credentials: Partial<IUser>) {
    const { email, password } = credentials;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.correctPassword(password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }
    return user;
  }

  public async refreshAuth(refreshToken: string) {
    const refreshTokenDoc = await this.tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await this.userRepository.findByID(`${refreshTokenDoc.user}`);
    if (!user) {
      throw new Error('User Not found');
    }
    await refreshTokenDoc.remove();
    return this.tokenService.generateAuthTokens(user);
  }

  public async logout(refreshToken: string) {
    const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
    if (!refreshTokenDoc) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
    }
    await refreshTokenDoc.remove();
  }
}
