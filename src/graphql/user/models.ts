import { IUser, UserRole } from '../../db/models';

interface IToken {
  accessToken: string;
  tokenType: string;
  expiresIn: string;
  refreshToken: string;
  createdAt: number;
  user: {
    email: string;
    role: UserRole;
  };
}

export { IToken, IUser };
