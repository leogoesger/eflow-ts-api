export const paperTypes = `
  type Paper {
    id: ID
    title: String
    description: String
    type: String
    authors: [String]
    journal: String
    publishedDate: String
    paperUrl: String
    imgUrl: String
    updatedAt: String
    createdAt: String
  }

  input CreatePaperPL {
    title: String
    description: String
    type: String
    authors: [String]
    journal: String
    publishedDate: String
    paperUrl: String
    imgUrl: String
    updatedAt: String
    createdAt: String
  }

  input UpdatePaperPL {
    id: ID!
    title: String
    description: String
    type: String
    authors: [String]
    journal: String
    publishedDate: String
    paperUrl: String
    imgUrl: String
    updatedAt: String
    createdAt: String
  }

  extend type Query {
    getPaper(id: Int): Paper
    getPapers: [Paper]
  }

  extend type Mutation {
    createPaper(createPaperPL: CreatePaperPL): Paper,
    updatePaper(updatePaperPL: UpdatePaperPL): Paper,
    deletePaper(id: Int!): [Boolean],
  }
`;
