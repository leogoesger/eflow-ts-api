import { expect } from 'chai';
import { graphql } from 'graphql';

import { schema } from '../../schema';
import { addMockFunction } from '../../../utils/testHelpers';

describe('user typeDefs', () => {
  addMockFunction();

  const query = `
  query loginUser($input: UserInfo){
    login(userInfo: $input){
      email
      role
    }
  }
  `;

  it('should contain all loginUser query fields', async () => {
    const res = await graphql(schema, query);
    expect(Boolean(res.data.login.email)).to.be.true;
    expect(Boolean(res.data.login.role)).to.be.true;
  });

  const createUserMutation = `
  mutation createUser($input: UserInfo){
    createUser(userInfo: $input){
      email
      role
    }
  }
  `;

  it('should contain all createUser mutation fields', async () => {
    const res = await graphql(schema, createUserMutation);
    expect(Boolean(res.data.createUser.email)).to.be.true;
    expect(Boolean(res.data.createUser.role)).to.be.true;
  });

  const createAdminMutation = `
  mutation createAdmin($input: AdminUserInfo){
    createAdmin(adminUserInfo: $input){
      email
      role
    }
  }
  `;

  it('should contain all createAdmin mutation fields', async () => {
    const res = await graphql(schema, createAdminMutation);
    expect(Boolean(res.data.createAdmin.email)).to.be.true;
    expect(Boolean(res.data.createAdmin.role)).to.be.true;
  });
});
