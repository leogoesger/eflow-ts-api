import { expect } from 'chai';
import { userQueries } from '../queries';
import { ILoginPL } from '../models';

describe('user queries', () => {
  it('should login with user info', async () => {
    const userInfo: ILoginPL = {
      email: 'test@gmail.com',
      password: 'test_password',
    };
    const res = await userQueries.login(null, { userInfo });
    expect(Boolean(res.user)).to.be.true;
    expect(Boolean(res.accessToken)).to.be.true;
    expect(res.user.email).to.equal(userInfo.email);
  });
});
