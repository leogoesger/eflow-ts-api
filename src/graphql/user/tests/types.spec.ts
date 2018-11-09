import { expect } from 'chai';
import { graphql } from 'graphql';

import { schema } from '../../schema';
import { addMockFunction } from '../../../utils/testHelpers';

describe('user typeDefs', () => {
  addMockFunction();

  const query = `
  query loginUser($input: userInfo){
    login(userInfo: $input){
      accessToken
      tokenType
      expiresIn
      refreshToken
      createdAt
      user {
        email
        role
      }
    }
  }
  `;

  it('should include login in query', async () => {
    const res = await graphql(schema, query);
    expect(Boolean(res.data.login.accessToken)).to.be.true;
  });

  const mutation = `
  mutation registerUser($input: userInfo){
    register(userInfo: $input){
      accessToken
      tokenType
        expiresIn
        refreshToken
        createdAt
        user {
          email
          role
        }
    }
  }
  `;

  it('should include register in mutation', async () => {
    const res = await graphql(schema, mutation);
    expect(Boolean(res.data.register.accessToken)).to.be.true;
  });
});
