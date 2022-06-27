import * as Joi from 'joi';
import MongoRepository from '../repository/mongo.repository';
import User from '../components/user/model/User';
import IUser from '../components/user/model/IUser';
import ApiError from '../utils/ApiError';
import * as httpStatus from 'http-status';

export default class Auth {
  private userRepository: MongoRepository;
  constructor() {
    this.userRepository = new MongoRepository(User);
    this.signup = this.signup.bind(this);
  }

  public async signup(credentials: Partial<IUser>) {
    const { name, email, password, passwordConfirm } = credentials;
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
      passwordConfirm: Joi.ref('password'),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ir'] } }),
    });
    const value = await schema.validateAsync({ name, password, passwordConfirm, email });
    if (!value) return value;
    const user = await this.userRepository.createOne(value);
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
