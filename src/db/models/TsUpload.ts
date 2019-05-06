import { Model, BuildOptions, DataTypes } from 'sequelize';

import { IDB } from './';

export interface ITsUpload {
  id?: number;
  name: string;
  riverName?: string;
  location?: string;
  params?: string;
  failed: boolean;
  dates: string[];
  flows: number[];
  startDate: string;
  yearRanges?: string;
  flowMatrix?: string;
  DRH?: string;
  allYear?: string;
  winter?: string;
  fall?: string;
  summer?: string;
  spring?: string;
  fallWinter?: string;
  userId?: number;
  updatedAt?: string;
  createdAt?: string;
}

interface ITsUploadExtend extends Model {
  id?: number;
  name: string;
  riverName?: string;
  location?: string;
  params?: string;
  failed: boolean;
  dates: string[];
  flows: number[];
  startDate: string;
  yearRanges?: string;
  flowMatrix?: string;
  DRH?: string;
  allYear?: string;
  winter?: string;
  fall?: string;
  summer?: string;
  spring?: string;
  fallWinter?: string;
  userId?: number;
  updatedAt?: string;
  createdAt?: string;
}

type TsUploadModel = typeof Model &
  (new (values?: object, options?: BuildOptions) => ITsUploadExtend) & {
    associate: (model: IDB) => any;
  };

const tsUploadFactory = sequalize => {
  const TsUpload = <TsUploadModel>sequalize.define('TsUpload', {
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
    params: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    riverName: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    failed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    dates: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    flows: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: false,
    },
    startDate: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    yearRanges: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    flowMatrix: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    DRH: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    allYear: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    winter: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    fall: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    summer: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    spring: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    fallWinter: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  });
  TsUpload.associate = models => {
    TsUpload.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    TsUpload.hasMany(models.Prediction, {
      foreignKey: 'uploadDataId',
      as: 'predictions',
    });
  };
  return TsUpload;
};

export { tsUploadFactory, TsUploadModel };
