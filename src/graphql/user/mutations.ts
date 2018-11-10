import { userServices } from './services';
import { IUser, IContext } from './models';

const service = new userServices();

interface IData {
  userInfo: IUser;
}

export const userMutations = {
  register: (_: any, { userInfo }: IData, { res }: IContext) =>
    service.register(userInfo, res),
};
