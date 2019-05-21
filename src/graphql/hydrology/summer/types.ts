export const summerTypes = `
  type Summer {
    id: Int
    timing: [Float]
    magnitude10: [Float]
    magnitude50: [Float]
    durationFlush: [Float]
    durationWet: [Float]
    noFlowCount: [Float]
    gaugeId: Int
    createdAt: String
    updatedAt: String
  }

  extend type Query {
    getSummer(gaugeInfo: IGaugeInfo): Summer
  }
`;
