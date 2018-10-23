export const userTypes = `
    type token {
      accessToken: String
      tokenType: String
      expiresIn: String
      refreshToken: String
      createdAt: String
      user: tokenUser
    }

    type tokenUser {
      email: String
      role: String
    }

    input userInfo {
      id: Int
      email: String
      password: String
      firstName: String
      lastName: String
      institution: String
    }

    extend type Query {
      login(userInfo: userInfo): token
    }

    extend type Mutation {
      register(userInfo: userInfo): token
    }
`;
