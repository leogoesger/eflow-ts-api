export const fallWinterTypes = `
  type FallWinter {
    id: Int
    magWet: [Float]
    gaugeId: Int
    createdAt: String
    updatedAt: String
  }

  extend type Query {
    getFallWinter(gaugeInfo: IGaugeInfo): FallWinter
  }
`;
