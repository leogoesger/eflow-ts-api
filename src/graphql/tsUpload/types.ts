export const tsUploadTypes = `

  type TsUpload {
    id: ID
    name: String
    succeed: Boolean
    dates: [String]
    flows: [Float]
    startDate: String
    yearRanges: String
    flowMatrix: String
    DRH: String
    allYear: String
    winter: String
    fall: String
    summer: String
    spring: String
    fallWinter: String
    userId: ID
    updatedAt: String
    createdAt: String
  }

  input UploadTimeSeriesPL {
    dates: [String]
    flows: [Float]
    startDate: String
  }

  extend type Mutation {
    uploadTimeSeries (uploadTimeSeriesPL: UploadTimeSeriesPL): TsUpload @isAuthenticated
  }
`;
