export const annualFlowTypes = `
    type AnnualFlow {
        id: ID
        year: Int
        flowData: [Float]
        createdAt: String
        updatedAt: String
        gaugeId: Int
    }

    extend type Query {
        getAnnualFlow(id: Int): AnnualFlow
        validateAnnualFlow(validatePL: validatePL!): Boolean
    }
`;
