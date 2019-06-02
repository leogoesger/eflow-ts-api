export const annualFlowTypes = `
    type AnnualFlow {
        id: Int
        gaugeId: Int
        flowData: [String]
        condition: ConditionType
        year: Int
        createdAt: String
        updatedAt: String
    }

    extend type Query {
        getAnnualFlow(gaugeInfo: IGaugeInfo): AnnualFlow
        validateAnnualFlow(validatePL: validatePL!): Boolean
    }
`;
