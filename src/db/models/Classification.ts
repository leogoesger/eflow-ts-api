import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

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

type ClassificationInstance = Sequelize.Instance<IClassification> &
  IClassification;

type ClassificationModel = Sequelize.Model<
  ClassificationInstance,
  IClassification
>;

const classificationFactory = (sequalize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<IClassification> = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    abbreviation: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    Avg: { type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)), allowNull: true },
    Std: { type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)), allowNull: true },
    CV: { type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)), allowNull: true },
    SP_Tim: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    SP_Mag: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    SP_Dur: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    SP_ROC: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    DS_Tim: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    DS_Mag_10: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    DS_Mag_50: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    DS_Dur_WSI: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    DS_Dur_WS: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    DS_No_Flow: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    WSI_Tim: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    WSI_Mag: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    Wet_Tim: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    WSI_Dur: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    Wet_BFL_Mag: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    Peak_Tim_2: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    Peak_Dur_2: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    Peak_Fre_2: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    Peak_Tim_5: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    Peak_Dur_5: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    Peak_Fre_5: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    Peak_Tim_10: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    Peak_Dur_10: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    Peak_Fre_10: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    Peak_Tim_20: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    Peak_Dur_20: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    Peak_Fre_20: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    Peak_Tim_50: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    Peak_Dur_50: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    Peak_Fre_50: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
  };
  const Classification = sequalize.define<
    ClassificationInstance,
    IClassification
  >('Classification', attributes);

  Classification.associate = models => {
    Classification.hasMany(models.Gauge, {
      foreignKey: 'classId',
      onDelete: 'cascade',
      as: 'gauges',
    });
  };
  return Classification;
};

export { classificationFactory, ClassificationModel };
