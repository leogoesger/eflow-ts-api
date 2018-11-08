export const memberTypes = `
  type Member {
    id: Int
    name: String
    description: String
    title: String
    image: String
    location: String
    website: String
    linkedin: String
    twitter: String
    github: String
    youtube: String
    googleScholar: String
    researchGate: String
    email: String
    papers: [Paper]
  }

  input CreateMemberPL {
    name: String
    description: String
    title: String
    image: String
    location: String
    website: String
    linkedin: String
    twitter: String
    github: String
    youtube: String
    googleScholar: String
    researchGate: String
    email: String
  }

  input UpdateMemberPL {
    id: ID!
    name: String
    description: String
    title: String
    image: String
    location: String
    website: String
    linkedin: String
    twitter: String
    github: String
    youtube: String
    googleScholar: String
    researchGate: String
    email: String
  }

  extend type Query {
    getMember(id: Int): Member
    getMembers: [Member]
  }

  extend type Mutation {
    createMember(createMemberPL: CreateMemberPL): Member,
    updateMember(updateMemberPL: UpdateMemberPL): Member,
    deleteMember(id: Int!): [Boolean],
  }
`;
