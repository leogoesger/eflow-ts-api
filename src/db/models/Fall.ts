import { Model, BuildOptions, DataTypes } from 'sequelize';

import { db, IDB } from './';

export interface IFall {
  id?: number;
  timing: number[];
  magnitude: number[];
  timingWet: number[];
  duration: number[];
  gaugeId: number;
  updatedAt?: string;
  createdAt?: string;
}

export interface IFallExtend extends Model {
  id?: number;
  timing: number[];
  magnitude: number[];
  timingWet: number[];
  duration: number[];
  gaugeId: number;
  updatedAt?: string;
  createdAt?: string;
}

type FallModel = typeof Model &
  (new (values?: object, options?: BuildOptions) => IFallExtend) & {
    associate: (model: IDB) => any;
  };

const fallFactory = sequalize => {
  const Fall = <FallModel>sequalize.define('Fall', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    timing: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    magnitude: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    timingWet: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    duration: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    gaugeId: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER,
    },
  });

  Fall.associate = models => {
    Fall.belongsTo(models.Gauge, {
      foreignKey: 'gaugeId',
      as: 'gauge',
    });
  };
  return Fall;
};

export { fallFactory, FallModel };
