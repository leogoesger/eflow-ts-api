export const annualFlowTypes = `
    type AnnualFlow {
        gaugeId: Int
        flowData: [String]
        year: Int
    }

    extend type Query {
        getAnnualFlow(gaugeInfo: IGaugeInfo): AnnualFlow
        validateAnnualFlow(validatePL: validatePL!): Boolean
    }
`;
