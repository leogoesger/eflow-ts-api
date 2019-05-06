import { Model, BuildOptions, DataTypes } from 'sequelize';

import { IDB } from './';

export interface ISpring {
  id?: number;
  timing: number[];
  magnitude: number[];
  rateOfChange: number[];
  duration: number[];
  gaugeId: number;
  updatedAt?: string;
  createdAt?: string;
}

interface ISpringExtend extends Model {
  id?: number;
  timing: number[];
  magnitude: number[];
  rateOfChange: number[];
  duration: number[];
  gaugeId: number;
  updatedAt?: string;
  createdAt?: string;
}

type SpringModel = typeof Model &
  (new (values?: object, options?: BuildOptions) => ISpringExtend) & {
    associate: (model: IDB) => any;
  };

const springFactory = sequalize => {
  const Spring = <SpringModel>sequalize.define('Spring', {
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
    rateOfChange: {
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
  Spring.associate = models => {
    Spring.belongsTo(models.Gauge, {
      foreignKey: 'gaugeId',
      as: 'gauge',
    });
  };
  return Spring;
};

export { springFactory, SpringModel };
