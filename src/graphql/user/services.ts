import * as uuidv4 from 'uuid/v4';
import { sign } from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';

import { User } from '../../db/models';
import { IToken, IUser } from './models';

export class userServices {
  User = User;

  public async register(d: IUser): Promise<IToken> {
    // bcrypt password using salt

    const passHash = await hash(d.password, 10);
    d.password = passHash;
    const user = await this.User.create(d);
    const SECRET = process.env.EFLOW_JWT_SECRET;
    const expiresIn = process.env.ACCESS_EXPIRY_TIME;

    const accessToken = sign({ email: user.email, role: user.role }, SECRET, {
      expiresIn: expiresIn,
    });

    const token: IToken = {
      accessToken,
      tokenType: 'Bearer',
      expiresIn,
      refreshToken: uuidv4(),
      createdAt: Date.now(),
      user: {
        email: user.email,
        role: user.role,
      },
    };
    return token;
  }

  public async login(userInput: IUser): Promise<IToken> {
    const user = await this.User.findOne({ where: { email: userInput.email } });

    if (!user) {
      throw 'No user found';
    }
    const res = await compare(userInput.password, user.password);

    if (res === true) {
      const SECRET = process.env.EFLOW_JWT_SECRET;
      const expiresIn = process.env.ACCESS_EXPIRY_TIME;

      const accessToken = sign({ email: user.email, role: user.role }, SECRET, {
        expiresIn: expiresIn,
      });
      const token: IToken = {
        accessToken,
        tokenType: 'Bearer',
        expiresIn,
        refreshToken: uuidv4(),
        createdAt: Date.now(),
        user: {
          email: user.email,
          role: user.role,
        },
      };
      return token;
    } else {
      throw 'User info does not match';
    }
  }
}
