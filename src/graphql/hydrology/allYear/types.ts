export const allYearTypes = `
    type AllYear {
        id: ID
        average: [Float]
        standardDeviation: [Float]
        coeffientVariance: [Float]
        gaugeId: Int
        createdAt: String
        updatedAt: String
    }

    extend type Query {
        getAllYear(gaugeInfo: IGaugeInfo): AllYear
        validateAllYear(validatePL: validatePL!): Boolean @hasRole(role: "ADMIN")
    }
`;
