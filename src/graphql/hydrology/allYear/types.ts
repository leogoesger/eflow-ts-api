export const allYearTypes = `
    type AllYear {
        id: ID
        average: [Float]
        standardDeviation: [Float]
        coeffientVariance: [Float]
        createdAt: String
        updatedAt: String
    }

    extend type Query {
        getAllYear(id: Int): AllYear
        validateAllYear(validatePL: validatePL!): Boolean @hasRole(role: "ADMIN")
    }
`;
