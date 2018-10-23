import { IUser } from '../../models';

enum Role {
  'USER',
  'ADMIN',
  'SUPER_ADMIN',
}

interface IToken {
  accessToken: string;
  tokenType: string;
  expiresIn: string;
  refreshToken: string;
  createdAt: number;
  user: {
    email: string;
    role: Role;
  };
}

export { IToken, IUser };
