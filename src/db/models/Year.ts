import { Model, BuildOptions, DataTypes } from 'sequelize';

import { IDB } from './';

export interface IYear {
  id?: number;
  year: number[];
  allYears: number[];
  gaugeId: number;
  updatedAt?: string;
  createdAt?: string;
}

interface IYearExtend extends Model {
  id?: number;
  year: number[];
  allYears: number[];
  gaugeId: number;
  updatedAt?: string;
  createdAt?: string;
}

type YearModel = typeof Model &
  (new (values?: object, options?: BuildOptions) => IYearExtend) & {
    findByToken: (d: any) => any;
  } & {
    associate: (model: IDB) => any;
  };

const yearFactory = sequalize => {
  const Year = <YearModel>sequalize.define('Year', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    year: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    allYears: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: true,
    },
    gaugeId: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER,
    },
  });
  Year.associate = models => {
    Year.belongsTo(models.Gauge, {
      foreignKey: 'gaugeId',
      as: 'gauge',
    });
  };
  return Year;
};

export { yearFactory, YearModel };
