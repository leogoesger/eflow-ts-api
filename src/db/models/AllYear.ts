import { Model, BuildOptions, DataTypes } from 'sequelize';
import { IDB } from './';

// import * as Promise from 'bluebird';
// global.Promise = Promise;

export interface IAllYear {
  id?: number;
  average: number[];
  standardDeviation: number[];
  coeffientVariance: number[];
  gaugeId: number;
  updatedAt?: string;
  createdAt?: string;
}

interface IAllYearExtend extends Model {
  id?: number;
  average: number[];
  standardDeviation: number[];
  coeffientVariance: number[];
  gaugeId: number;
  updatedAt?: string;
  createdAt?: string;
}

type AllYearModel = typeof Model &
  (new (values?: object, options?: BuildOptions) => IAllYearExtend) & {
    associate: (model: IDB) => any;
  };

const allYearFactory = sequalize => {
  const AllYear = <AllYearModel>sequalize.define('AllYear', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    average: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    standardDeviation: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    coeffientVariance: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    gaugeId: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER,
    },
  });
  AllYear.associate = (models: IDB) => {
    AllYear.belongsTo(models.Gauge, {
      foreignKey: 'gaugeId',
      as: 'gauge',
    });
  };
  return AllYear;
};

export { allYearFactory, AllYearModel };
