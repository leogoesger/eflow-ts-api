export const springTypes = `
  type Spring {
    id: Int
    timing: [Float]
    magnitude: [Float]
    duration: [Float]
    rateOfChange: [Float]
    gaugeId: Int
    createdAt: String
    updatedAt: String
  }

  extend type Query {
    getSpring(gaugeInfo: IGaugeInfo): Spring
  }
`;
