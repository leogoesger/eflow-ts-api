import { expect } from 'chai';

import { userMutations } from '../mutations';
import { IUser, UserRole, ILoginPL } from '../models';

describe('user mutations', () => {
  it('should register new user', async () => {
    const userInfo: IUser = {
      role: UserRole.USER,
      firstName: 'test_first_name',
      lastName: 'test_last_name',
      email: 'test@gmail.com',
      password: 'test_password',
    };
    const res = await userMutations.register(null, { userInfo });
    expect(Boolean(res.user)).to.be.true;
    expect(res.user.email).to.equal(userInfo.email);
    expect(res.user.role).to.equal(userInfo.role);
  });
});
