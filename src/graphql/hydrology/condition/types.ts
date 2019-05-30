export const conditionTypes = `

    enum ConditionType {
        DRY
        WET
        MODERATE
        NA
    }

    type Condition {
        id: ID
        gaugeId: Int
        conditions: [ConditionType]
        year: Int
        createdAt: String
        updatedAt: String
    }

    extend type Query {
        getCondition(gaugeInfo: IGaugeInfo): Condition
        getConditions(gaugeInfo: IGaugeInfo): Condition
    }
`;
