import { IUser, UserRole } from '../../db/models';
import { IContext } from '../models';

interface IResponse {
  email: string;
  role: UserRole;
}

interface ILoginPL {
  email: string;
  password: string;
}

export { IResponse, IUser, UserRole, ILoginPL, IContext };
