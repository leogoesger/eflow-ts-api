import { Response } from 'express';
import * as uuidv4 from 'uuid/v4';
import { sign } from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';

import { User } from '../../db/models';
import { IResponse, IUser, ILoginPL } from './models';

export class userServices {
  User = User;

  public async register(d: IUser, res: Response): Promise<IResponse> {
    // bcrypt password using salt

    const passHash = await hash(d.password, 10);
    d.password = passHash;
    const user = await this.User.create(d);

    return returnAndSignCookies(user, res);
  }

  public async login(userInput: ILoginPL, res: Response): Promise<IResponse> {
    const user = await this.User.findOne({ where: { email: userInput.email } });

    if (!user) {
      throw 'No user found';
    }
    const isValidPass = await compare(userInput.password, user.password);

    if (isValidPass === true) {
      return returnAndSignCookies(user, res);
    } else {
      throw 'User info does not match';
    }
  }
}

const returnAndSignCookies = (user: any, res: Response) => {
  const SECRET = process.env.EFLOW_JWT_SECRET;
  const expiresIn = process.env.ACCESS_EXPIRY_TIME;

  const accessToken = sign({ email: user.email, role: user.role }, SECRET, {
      expiresIn,
    }),
    refreshToken = uuidv4();

  const response: IResponse = {
    email: user.email,
    role: user.role,
  };
  res.cookie('accessToken', accessToken, {
    maxAge: Number(expiresIn),
    httpOnly: true,
  });
  res.cookie('refreshToken', refreshToken, {
    maxAge: Number(expiresIn),
    httpOnly: true,
  });
  return response;
};
