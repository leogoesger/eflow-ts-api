export const userTypes = `
    type response {
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
      login(userInfo: userInfo): response
    }

    extend type Mutation {
      register(userInfo: userInfo): response
    }
`;
