export const allYearTypes = `
    type AllYear {
        id: ID
        average: [Float]
        standardDeviation: [Float]
        coeffientVariance: [Float]
        createdAt: String
        updatedAt: String
    }

    input validatePL {
        gaugeNum: Int
        yearNum: Int
    }

    extend type Query {
        getAllYear(id: Int): AllYear
        validateAllYear(validatePL: validatePL): Boolean
    }
`;
