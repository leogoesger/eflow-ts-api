import { expect } from 'chai';

import { userMutations } from '../mutations';
import { IUser, UserRole } from '../models';

describe('user mutations', () => {
  it('should register new user', async () => {
    const userInfo: IUser = {
      role: UserRole.USER,
      firstName: 'test_first_name',
      lastName: 'test_last_name',
      email: 'test@gmail.com',
      password: 'test_password',
    };

    const mock: any = {
      res: {
        cookie: (): any => null,
      },
      req: (): any => null,
    };
    const regUser = await userMutations.register(null, { userInfo }, mock);
    expect(Boolean(regUser.email)).to.be.true;
    expect(regUser.role).to.equal(userInfo.role);
  });
});
