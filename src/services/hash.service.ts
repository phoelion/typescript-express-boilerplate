import { randomBytes } from 'crypto';
import { v4 as uuidV4 } from 'uuid';

// import { hashSync, compareSync } from 'bcrypt'

export const randomHash = (length = 20): string => {
  return randomBytes(length).toString('hex');
};

export const hashFromUUID = (): string => {
  return uuidV4();
};

// export const hashPassword = (plainPassword:string):string => {
//   return hashSync(plainPassword, 10)
// }

// export const comparePassword = (plainPassword:string, hashedPassword:string):boolean => {
//   return compareSync(plainPassword, hashedPassword)
// }
