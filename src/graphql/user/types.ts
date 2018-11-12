export const userTypes = `
    type response {
      email: String
      role: String
    }

    input UserInfo {
      email: String
      password: String
      firstName: String
      lastName: String
      institution: String
    }

    enum UserRole {
      USER
      ADMIN
      SUPER_ADMIN
    }

    input AdminUserInfo {
      email: String
      password: String
      firstName: String
      lastName: String
      role: UserRole
    }

    extend type Query {
      login(userInfo: UserInfo): response
    }

    extend type Mutation {
      createUser(userInfo: UserInfo): response
      createAdmin(adminUserInfo: AdminUserInfo): response @hasRole(role: "SUPER_ADMIN")
    }
`;
