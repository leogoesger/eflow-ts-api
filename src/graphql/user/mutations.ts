import { UserServices } from './services';
import { IUser, IContext } from './models';

const service = new UserServices();

interface IData {
  userInfo?: IUser;
  adminUserInfo?: IUser;
}

export const userMutations = {
  createUser: (_: any, { userInfo }: IData, { res }: IContext) =>
    service.createUser(userInfo, res),

  createAdmin: (_: any, { adminUserInfo }: IData, { res }: IContext) =>
    service.createUser(adminUserInfo, res),
};
