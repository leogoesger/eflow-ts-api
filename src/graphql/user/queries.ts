import { userServices } from './services';
import { IUser } from './models';

const service = new userServices();

export const userQueries = {
  login: (_: any, { userInfo }: { userInfo: IUser }) => service.login(userInfo),
};
