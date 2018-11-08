export const hydrographTypes = `
  type Hydrograph {
    type: HydrographType
    data: [Float]
    percentile: String
    gaugeId: Int
    classId: Int
  }

  enum HydrographType {
    CLASS
    GAUGE
  }

  input getHydrographPL {
    gaugeId: Int
    type: HydrographType
  }

  extend type Query {
    getHydrograph(payload: getHydrographPL): Hydrograph
  }
`;
