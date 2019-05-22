export const fallTypes = `
  type Fall {
    id: Int
    timing: [Float]
    timingWet: [Float]
    magnitude: [Float]
    duration: [Float]
    gaugeId: Int
    createdAt: String
    updatedAt: String
  }

  extend type Query {
    getFall(gaugeInfo: IGaugeInfo): Fall
  }
`;
