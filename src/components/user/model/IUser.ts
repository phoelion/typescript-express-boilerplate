import { Document } from 'mongoose'
export default interface IUser extends Document {
  name: string
  email: string
  photo: string
  role: string
  isEmailVerified: boolean
  password: string | undefined
  passwordConfirm: string | undefined
  passwordChangedAt: Date
  passwordResetToken: string | undefined
  passwordResetExpires: Date | undefined
  changedPasswordAfter: any
  correctPassword: any
  active: boolean
  createPasswordResetToken: any
}
