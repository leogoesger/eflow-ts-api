export const hydrographTypes = `
  type Hydrograph {
    type: HydrographType
    drh: DRH
    gaugeId: Int
    classId: Int
  }

  type DRH {
    TEN: [Float]
    TWENTYFIVE: [Float]
    FIFTY: [Float]
    SEVENTYFIVE: [Float]
    NINTY:[Float]
    MAX:[Float]
    MIN:[Float]
  }

  enum HydrographType {
    CLASS
    GAUGE
  }

  input IHydroInfo {
    id: Int
    type: HydrographType
  }

  extend type Query {
    getHydrograph(hydroInfo: IHydroInfo): Hydrograph
  }
`;
