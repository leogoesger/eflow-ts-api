export const winterTypes = `
  type Winter {
    id: Int
    timing2: [Float]
    timing5: [Float]
    timing10: [Float]
    timing20: [Float]
    timing50: [Float]
    duration2: [Float]
    duration5: [Float]
    duration10: [Float]
    duration20: [Float]
    duration50: [Float]
    frequency2: [Float]
    frequency5: [Float]
    frequency10: [Float]
    frequency20: [Float]
    frequency50: [Float]
    magnitude2: [Float]
    magnitude5: [Float]
    magnitude10: [Float]
    magnitude20: [Float]
    magnitude50: [Float]
    gaugeId: Int
    updatedAt: String
    createdAt: String
  }

  extend type Query {
    getWinter(gaugeInfo: IGaugeInfo): Winter
  }
`;
