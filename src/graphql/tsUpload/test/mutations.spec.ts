import chai = require('chai');
chai.use(require('chai-as-promised'));
import { expect } from 'chai';

import { User, UserRole } from '../../../db/models';
import { tsUploadMutations } from '../mutations';
import { UploadTimeSeriesPL } from '../models';

describe('user mutations', () => {
  it('should throw an error', async () => {
    const uploadTimeSeriesPL: UploadTimeSeriesPL = {
      dates: ['10/01'],
      flows: [1.2],
      startDate: '10/01',
      name: 'Hello world',
    };

    const user = await User.create({
      email: 'leo@test.com',
      password: 'abctest',
      role: UserRole.USER,
      firstName: 'leo',
      lastName: 'qiu',
    });

    const mock: any = {
      req: {
        user,
      },
    };

    expect(
      tsUploadMutations.uploadTimeSeries(null, { uploadTimeSeriesPL }, mock)
    ).to.eventually.be.rejectedWith('Data could not be processed');
  });
});
