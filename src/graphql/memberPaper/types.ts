export const memberPaperTypes = `
  type MemberPaper {
    id: ID
    memberId: Int
    paperId: Int
  }

  input CreateMemberPaperPL {
    memberId: Int!
    paperId: Int!
  }

  input UpdateMemberPaperPL {
    id: ID!
    memberId: Int
    paperId: Int
  }

  extend type Mutation {
    createMemberPaper(createMemberPaperPL: CreateMemberPaperPL): MemberPaper,
    updateMemberPaper(updateMemberPaperPL: UpdateMemberPaperPL): MemberPaper,
    deleteMemberPaper(id: Int!): [Boolean],
  }
`;
