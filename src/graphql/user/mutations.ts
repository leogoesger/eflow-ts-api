import { userServices } from './services';
import { IUser } from './models';

const service = new userServices();

export const userMutations = {
  register: (_: any, { userInfo }: { userInfo: IUser }) => {
    return service.register(userInfo);
  },
};
