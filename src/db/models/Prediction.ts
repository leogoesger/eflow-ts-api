import { Model, BuildOptions, DataTypes } from 'sequelize';

import { IDB } from './';

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

interface IPredictionExtend extends Model {
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

type PredictionModel = typeof Model &
  (new (values?: object, options?: BuildOptions) => IPredictionExtend) & {
    associate: (model: IDB) => any;
  };

const predictionFactory = sequelize => {
  const Prediction = <PredictionModel>sequelize.define('Prediction', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    prediction: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    one: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    two: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    three: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    four: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    five: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    six: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    seven: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    eight: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    nine: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    tsUploadId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  });

  Prediction.associate = models => {
    Prediction.belongsTo(models.TsUpload, {
      foreignKey: 'tsUploadId',
      as: 'TsUpload',
    });
  };
  return Prediction;
};

export { predictionFactory, PredictionModel };
