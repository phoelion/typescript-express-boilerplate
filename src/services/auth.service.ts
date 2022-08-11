import MongoRepository from '../repository/mongo.repository';
import User from '../components/user/model/User';
import IUser from '../components/user/model/IUser';
import ApiError from '../utils/ApiError';
import * as httpStatus from 'http-status';
import { validateSignup } from '../utils/Validators';

export default class Auth {
  private userRepository: MongoRepository;
  constructor() {
    this.userRepository = new MongoRepository(User);
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
}
