import { expect } from 'chai';
import { graphql } from 'graphql';

import { schema } from '../../schema';
import { addMockFunction } from '../../../utils/testHelpers';

describe('user typeDefs', () => {
  addMockFunction();

  const query = `
  query loginUser($input: userInfo){
    login(userInfo: $input){
      email
      role
    }
  }
  `;

  it('should include login in query', async () => {
    const res = await graphql(schema, query);
    expect(Boolean(res.data.login.email)).to.be.true;
    expect(Boolean(res.data.login.role)).to.be.true;
  });

  const mutation = `
  mutation registerUser($input: userInfo){
    register(userInfo: $input){
      email
      role
    }
  }
  `;

  it('should include register in mutation', async () => {
    const res = await graphql(schema, mutation);
    expect(Boolean(res.data.register.email)).to.be.true;
    expect(Boolean(res.data.register.role)).to.be.true;
  });
});
