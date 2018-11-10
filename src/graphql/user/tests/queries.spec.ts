import { expect } from 'chai';
import { userQueries } from '../queries';
import { ILoginPL } from '../models';

describe('user queries', () => {
  it('should login with user info', async () => {
    const userInfo: ILoginPL = {
      email: 'test@gmail.com',
      password: 'test_password',
    };
    const mock: any = {
      res: {
        cookie: (): any => null,
      },
      req: (): any => null,
    };
    const res = await userQueries.login(null, { userInfo }, mock);
    expect(Boolean(res.email)).to.be.true;
    expect(Boolean(res.role)).to.be.true;
    expect(res.email).to.equal(userInfo.email);
  });
});
