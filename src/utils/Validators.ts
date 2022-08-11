import IUser from '../components/user/model/IUser';
import * as Joi from 'joi';

const validateSignup = async (credentials: Partial<IUser>) => {
  const { name, email, password, passwordConfirm } = credentials;
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    passwordConfirm: Joi.ref('password'),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ir'] } }),
  });
  return await schema.validateAsync({ name, password, passwordConfirm, email });
};

export { validateSignup };
