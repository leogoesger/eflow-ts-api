import { Model, BuildOptions, DataTypes } from 'sequelize';

import { IDB } from './';

export interface ISummer {
  id?: number;
  timing: number[];
  magnitude10: number[];
  magnitude50: number[];
  durationFlush: number[];
  durationWet: number[];
  noFlowCount: number[];
  gaugeId: number;
  updatedAt?: string;
  createdAt?: string;
}

interface ISummerExtend extends Model {
  id?: number;
  timing: number[];
  magnitude10: number[];
  magnitude50: number[];
  durationFlush: number[];
  durationWet: number[];
  noFlowCount: number[];
  gaugeId: number;
  updatedAt?: string;
  createdAt?: string;
}

type SummerModel = typeof Model &
  (new (values?: object, options?: BuildOptions) => ISummerExtend) & {
    associate: (model: IDB) => any;
  };

const summerFactory = sequalize => {
  const Summer = <SummerModel>sequalize.define('Summer', {
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
    magnitude10: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    magnitude50: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    durationFlush: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    durationWet: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    noFlowCount: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    gaugeId: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER,
    },
  });
  Summer.associate = models => {
    Summer.belongsTo(models.Gauge, {
      foreignKey: 'gaugeId',
      as: 'gauge',
    });
  };
  return Summer;
};

export { summerFactory, SummerModel };
