import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';
import sequelize = require('sequelize');

export interface IPrediction {
  id?: number;
  prediction: string;
  one: number[];
  two: number[];
  three: number[];
  four: number[];
  five: number[];
  six: number[];
  seven: number[];
  eight: number[];
  nine: number[];
  tsUploadId: number;
}

type PredictionInstance = Sequelize.Instance<IPrediction> & IPrediction;
type PredictionModel = Sequelize.Model<PredictionInstance, IPrediction>;

const predictionFactory = (sequelize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<IPrediction> = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    prediction: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    one: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)), // eslint-disable-line
      allowNull: true,
    },
    two: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)), // eslint-disable-line
      allowNull: true,
    },
    three: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)), // eslint-disable-line
      allowNull: true,
    },
    four: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)), // eslint-disable-line
      allowNull: true,
    },
    five: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)), // eslint-disable-line
      allowNull: true,
    },
    six: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)), // eslint-disable-line
      allowNull: true,
    },
    seven: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)), // eslint-disable-line
      allowNull: true,
    },
    eight: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)), // eslint-disable-line
      allowNull: true,
    },
    nine: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)), // eslint-disable-line
      allowNull: true,
    },
    tsUploadId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
  };

  const Prediction = sequelize.define<PredictionInstance, IPrediction>(
    'Prediction',
    attributes
  );

  Prediction.associate = (models) => {
    Prediction.belongsTo(models.TsUpload, {
      foreignKey: 'tsUploadId',
      as: 'TsUpload',
    });
  };
  return Prediction;
};

export { predictionFactory, PredictionModel };
