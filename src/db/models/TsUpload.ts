import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export interface ITsUpload {
  id?: number;
  name: string;
  succeed: boolean;
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
    succeed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
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
      allowNull: false,
    },
    flowMatrix: {
      type: Sequelize.JSONB,
      allowNull: false,
    },
    DRH: {
      type: Sequelize.JSONB,
      allowNull: false,
    },
    allYear: {
      type: Sequelize.JSONB,
      allowNull: false,
    },
    winter: {
      type: Sequelize.JSONB,
      allowNull: false,
    },
    fall: {
      type: Sequelize.JSONB,
      allowNull: false,
    },
    summer: {
      type: Sequelize.JSONB,
      allowNull: false,
    },
    spring: {
      type: Sequelize.JSONB,
      allowNull: false,
    },
    fallWinter: {
      type: Sequelize.JSONB,
      allowNull: false,
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
  };
  return TsUpload;
};

export { tsUploadFactory, TsUploadModel };
