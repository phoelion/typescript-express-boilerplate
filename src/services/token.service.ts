import config from '../config/config';
import IUser from '../components/user/model/IUser';
import * as moment from 'moment';
import * as jwt from 'jsonwebtoken';
import tokenTypes from '../config/tokens';
import Token from '../components/token/token';

export default class TokenService {
  private saveToken = async (token: string, userId: Partial<IUser>, expires: any, type: tokenTypes, blacklisted = false) => {
    const tokenDoc = await Token.create({
      token,
      user: userId,
      expires: expires.toDate(),
      type,
      blacklisted,
    });
    return tokenDoc;
  };
  private generateToken(userId: string, expires: any, type: tokenTypes, secret = config.jwt.secret) {
    const payload = {
      sub: userId,
      iat: moment().unix(),
      exp: expires.unix(),
      type,
    };
    return jwt.sign(payload, secret);
  }
  public async generateAuthTokens(user: IUser) {
    const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
    const accessToken = this.generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

    const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
    const refreshToken = this.generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH);
    await this.saveToken(refreshToken, user.id, refreshTokenExpires, tokenTypes.REFRESH);

    return {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate(),
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toDate(),
      },
    };
  }
  public async verifyToken(token: string, type: tokenTypes) {
    const payload = jwt.verify(token, config.jwt.secret);
    const tokenDoc = await Token.findOne({ token, type, user: payload.sub, blacklisted: false });
    if (!tokenDoc) {
      throw new Error('Token not found');
    }
    return tokenDoc;
  }
}
