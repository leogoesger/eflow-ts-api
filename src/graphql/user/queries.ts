import { UserServices } from './services';
import { ILoginPL, IContext } from './models';

interface IData {
  userInfo: ILoginPL;
}
const service = new UserServices();

export const userQueries = {
  login: (_: any, { userInfo }: IData, { res }: IContext) =>
    service.login(userInfo, res),
};
