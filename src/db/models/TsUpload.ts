import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export interface ITsUpload {
  id?: number;
  name: string;
  riverName?: string;
  location?: string;
  params?:string;
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

type TsUploadInstance = Sequelize.Instance<ITsUpload> & ITsUpload;

type TsUploadModel = Sequelize.Model<TsUploadInstance, ITsUpload>;

const tsUploadFactory = (sequalize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<ITsUpload> = {
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
    params:{
      type: Sequelize.TEXT,
      allowNull: true,
    },
    riverName: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    location: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    failed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    dates: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false,
    },
    flows: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: false,
    },
    startDate: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    yearRanges: {
      type: Sequelize.JSONB,
      allowNull: true,
    },
    flowMatrix: {
      type: Sequelize.JSONB,
      allowNull: true,
    },
    DRH: {
      type: Sequelize.JSONB,
      allowNull: true,
    },
    allYear: {
      type: Sequelize.JSONB,
      allowNull: true,
    },
    winter: {
      type: Sequelize.JSONB,
      allowNull: true,
    },
    fall: {
      type: Sequelize.JSONB,
      allowNull: true,
    },
    summer: {
      type: Sequelize.JSONB,
      allowNull: true,
    },
    spring: {
      type: Sequelize.JSONB,
      allowNull: true,
    },
    fallWinter: {
      type: Sequelize.JSONB,
      allowNull: true,
    },
    userId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
  };
  const TsUpload = sequalize.define<TsUploadInstance, ITsUpload>(
    'TsUpload',
    attributes
  );
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
