import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export interface IUploadData {
  id: number;
  name: string;
  startDate: string;
  yearRanges: string;
  flowMatrix: string;
  DRH: string;
  allYear: string;
  winter: string;
  fall: string;
  summer: string;
  spring: string;
  fallWinter: string;
}

type UploadDataInstance = Sequelize.Instance<IUploadData> & IUploadData;

type UploadDataModel = Sequelize.Model<UploadDataInstance, IUploadData>;

const uploadDataFactory = (sequalize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<IUploadData> = {
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
  };
  const UploadData = sequalize.define<UploadDataInstance, IUploadData>(
    'UploadData',
    attributes
  );
  UploadData.associate = models => {
    UploadData.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
  };
  return UploadData;
};

export { uploadDataFactory, UploadDataModel };
