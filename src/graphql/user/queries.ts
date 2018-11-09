import { userServices } from './services';
import { ILoginPL } from './models';

const service = new userServices();

export const userQueries = {
  login: (_: any, { userInfo }: { userInfo: ILoginPL }) =>
    service.login(userInfo),
};
