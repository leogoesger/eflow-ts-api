import { Model, BuildOptions, DataTypes } from 'sequelize';

import { db, IDB } from './';

export interface IClassification {
  id: number;
  name: string;
  description: string;
  abbreviation: string;
  Avg: number[];
  Std: number[];
  CV: number[];
  SP_Tim: number[];
  SP_Mag: number[];
  SP_Dur: number[];
  SP_ROC: number[];
  DS_Tim: number[];
  DS_Mag_10: number[];
  DS_Mag_50: number[];
  DS_Dur_WSI: number[];
  DS_Dur_WS: number[];
  DS_No_Flow: number[];
  WSI_Tim: number[];
  WSI_Mag: number[];
  Wet_Tim: number[];
  WSI_Dur: number[];
  Wet_BFL_Mag: number[];
  Peak_Tim_2: number[];
  Peak_Dur_2: number[];
  Peak_Fre_2: number[];
  Peak_Tim_5: number[];
  Peak_Dur_5: number[];
  Peak_Fre_5: number[];
  Peak_Tim_10: number[];
  Peak_Dur_10: number[];
  Peak_Fre_10: number[];
  Peak_Tim_20: number[];
  Peak_Dur_20: number[];
  Peak_Fre_20: number[];
  Peak_Tim_50: number[];
  Peak_Dur_50: number[];
  Peak_Fre_50: number[];
  updatedAt?: string;
  createdAt?: string;
}

export interface IClassificationExtend extends Model {
  id: number;
  name: string;
  description: string;
  abbreviation: string;
  Avg: number[];
  Std: number[];
  CV: number[];
  SP_Tim: number[];
  SP_Mag: number[];
  SP_Dur: number[];
  SP_ROC: number[];
  DS_Tim: number[];
  DS_Mag_10: number[];
  DS_Mag_50: number[];
  DS_Dur_WSI: number[];
  DS_Dur_WS: number[];
  DS_No_Flow: number[];
  WSI_Tim: number[];
  WSI_Mag: number[];
  Wet_Tim: number[];
  WSI_Dur: number[];
  Wet_BFL_Mag: number[];
  Peak_Tim_2: number[];
  Peak_Dur_2: number[];
  Peak_Fre_2: number[];
  Peak_Tim_5: number[];
  Peak_Dur_5: number[];
  Peak_Fre_5: number[];
  Peak_Tim_10: number[];
  Peak_Dur_10: number[];
  Peak_Fre_10: number[];
  Peak_Tim_20: number[];
  Peak_Dur_20: number[];
  Peak_Fre_20: number[];
  Peak_Tim_50: number[];
  Peak_Dur_50: number[];
  Peak_Fre_50: number[];
  updatedAt?: string;
  createdAt?: string;
}

type ClassificationModel = typeof Model &
  (new (values?: object, options?: BuildOptions) => IClassificationExtend) & {
    associate: (model: IDB) => any;
  };
const classificationFactory = sequalize => {
  const Classification = <ClassificationModel>sequalize.define(
    'Classification',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      abbreviation: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      Avg: { type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)), allowNull: true },
      Std: { type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)), allowNull: true },
      CV: { type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)), allowNull: true },
      SP_Tim: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
        allowNull: true,
      },
      SP_Mag: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
        allowNull: true,
      },
      SP_Dur: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
        allowNull: true,
      },
      SP_ROC: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
        allowNull: true,
      },
      DS_Tim: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
        allowNull: true,
      },
      DS_Mag_10: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
        allowNull: true,
      },
      DS_Mag_50: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
        allowNull: true,
      },
      DS_Dur_WSI: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
        allowNull: true,
      },
      DS_Dur_WS: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
        allowNull: true,
      },
      DS_No_Flow: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
        allowNull: true,
      },
      WSI_Tim: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
        allowNull: true,
      },
      WSI_Mag: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
        allowNull: true,
      },
      Wet_Tim: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
        allowNull: true,
      },
      WSI_Dur: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
        allowNull: true,
      },
      Wet_BFL_Mag: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
        allowNull: true,
      },
      Peak_Tim_2: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
        allowNull: true,
      },
      Peak_Dur_2: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
        allowNull: true,
      },
      Peak_Fre_2: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
        allowNull: true,
      },
      Peak_Tim_5: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
        allowNull: true,
      },
      Peak_Dur_5: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
        allowNull: true,
      },
      Peak_Fre_5: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
        allowNull: true,
      },
      Peak_Tim_10: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
        allowNull: true,
      },
      Peak_Dur_10: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
        allowNull: true,
      },
      Peak_Fre_10: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
        allowNull: true,
      },
      Peak_Tim_20: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
        allowNull: true,
      },
      Peak_Dur_20: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
        allowNull: true,
      },
      Peak_Fre_20: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
        allowNull: true,
      },
      Peak_Tim_50: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
        allowNull: true,
      },
      Peak_Dur_50: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
        allowNull: true,
      },
      Peak_Fre_50: {
        type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
        allowNull: true,
      },
    }
  );

  Classification.associate = (models: IDB) => {
    Classification.hasMany(models.Gauge, {
      foreignKey: 'classId',
      onDelete: 'cascade',
      as: 'gauges',
    });
    Classification.hasMany(models.Hydrograph, {
      foreignKey: 'classId',
      onDelete: 'cascade',
      as: 'hydrographs',
    });
  };
  return Classification;
};

export { classificationFactory, ClassificationModel };
