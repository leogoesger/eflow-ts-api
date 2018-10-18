export const classificationTypes = `
    type Classification {
        id: ID
        name: String
        description: String
        abbreviation: String
        Avg: [Float]
        Std: [Float]
        CV: [Float]
        SP_Tim: [Float]
        SP_Mag: [Float]
        SP_Dur: [Float]
        SP_ROC: [Float]
        DS_Tim: [Float]
        DS_Mag_10: [Float]
        DS_Mag_50: [Float]
        DS_Dur_WSI: [Float]
        DS_Dur_WS: [Float]
        DS_No_Flow: [Float]
        WSI_Tim: [Float]
        WSI_Mag: [Float]
        Wet_Tim: [Float]
        WSI_Dur: [Float]
        Wet_BFL_Mag: [Float]
        Peak_Tim_2: [Float]
        Peak_Dur_2: [Float]
        Peak_Fre_2: [Float]
        Peak_Tim_5: [Float]
        Peak_Dur_5: [Float]
        Peak_Fre_5: [Float]
        Peak_Tim_10: [Float]
        Peak_Dur_10: [Float]
        Peak_Fre_10: [Float]
        Peak_Tim_20: [Float]
        Peak_Dur_20: [Float]
        Peak_Fre_20: [Float]
        Peak_Tim_50: [Float]
        Peak_Dur_50: [Float]
        Peak_Fre_50: [Float]
        createdAt: String
        updatedAt: String
    }

    extend type Query {
        getClassification(id: Int): Classification
        getClassifications: [Classification]
    }
`;
