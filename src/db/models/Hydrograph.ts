import { Model, BuildOptions, DataTypes } from 'sequelize';

import { IDB } from './';
export enum Percentilles {
  'TEN',
  'TWENTYFIVE',
  'FIFTY',
  'SEVENTYFIVE',
  'NINTY',
  'MIN',
  'MAX',
}

export enum Types {
  'GAUGE',
  'CLASS',
}

export interface IHydrograph {
  id?: number;
  data: number[];
  percentille: string;
  type: string;
  classId?: number;
  gaugeId?: number;
  updatedAt?: string;
  createdAt?: string;
}

interface IHydrographExtend extends Model {
  id?: number;
  data: number[];
  percentille: string;
  type: string;
  classId?: number;
  gaugeId?: number;
  updatedAt?: string;
  createdAt?: string;
}

type HydrographModel = typeof Model &
  (new (values?: object, options?: BuildOptions) => IHydrographExtend) & {
    associate: (model: IDB) => any;
  };

const hydrographFactory = sequalize => {
  const Hydrograph = <HydrographModel>sequalize.define('Hydrograph', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    data: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)), // eslint-disable-line
      allowNull: true,
    },
    percentille: {
      type: DataTypes.ENUM,
      values: [
        'TEN',
        'TWENTYFIVE',
        'FIFTY',
        'SEVENTYFIVE',
        'NINTY',
        'MIN',
        'MAX',
      ],
    },
    type: {
      type: DataTypes.ENUM,
      values: ['GAUGE', 'CLASS'],
    },
    gaugeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    classId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  });

  Hydrograph.associate = models => {
    Hydrograph.belongsTo(models.Gauge, {
      foreignKey: 'gaugeId',
      as: 'gauge',
    });
    Hydrograph.belongsTo(models.Classification, {
      foreignKey: 'classId',
      as: 'class',
    });
  };
  return Hydrograph;
};

export { hydrographFactory, HydrographModel };
