export const tsUploadTypes = `

  type TsUpload {
    id: ID
    name: String
    failed: Boolean
    riverName: String
    location: String
    dates: [String]
    flows: [Float]
    params: String
    startDate: String
    yearRanges: [Int]
    flowMatrix: [[Float]]
    DRH: DRHRes
    allYear: AllYearRes
    winter: WinterRes
    fall: FallRes
    summer: SummerRes
    spring: SpringRes
    fallWinter: FallWinterRes
    userId: ID
    updatedAt: String
    createdAt: String
  }

  type AllYearRes {
    standard_deviations: [Float]
    average_annual_flows: [Float]
    coefficient_variations: [Float]
  }

  type FallRes {
    timings: [Float]
    durations: [Float]
    magnitudes: [Float]
    wet_timings: [Float]
  }

  type SummerRes {
    timings: [Float]
    durations_wet: [Float]
    magnitudes_ten: [Float]
    no_flow_counts: [Int]
    durations_flush: [Float]
    magnitudes_fifty: [Float]
  }

  type SpringRes {
    rocs: [Float]
    timings: [Float]
    durations: [Float]
    magnitudes: [Float]
  }

  type FallWinterRes {
    baseflows: [Float]
  }

  type WinterRes {
    timings: Percentilles
    durations: Percentilles
    frequencys: Percentilles
  }

  type Percentilles {
    two: [Float]
    five: [Float]
    ten: [Float]
    twenty: [Float]
    fifty: [Float]
  }

  type DRHRes {
    min: [Float]
    ten: [Float]
    twenty_five: [Float]
    fifty: [Float]
    seventy_five: [Float]
    ninty: [Float]
    max: [Float]
  }

  input UploadTimeSeriesPL {
    dates: [String]!
    flows: [Float]!
    startDate: String!
    name: String!
  }

  extend type Mutation {
    uploadTimeSeries (uploadTimeSeriesPL: UploadTimeSeriesPL!): TsUpload @isAuthenticated
  }
`;
