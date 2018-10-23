import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

enum Percentilles {
  'TEN',
  'TWENTYFIVE',
  'FIFTY',
  'SEVENTYFIVE',
  'NINTY',
  'MIN',
  'MAX',
}

enum Types {
  'GAUGE',
  'CLASS',
}

export interface IHydrograph {
  id: number;
  data: number[];
  percentille: Percentilles;
  type: Types;
  classId: number;
  gaugeId: number;
  updatedAt?: string;
  createdAt?: string;
}

type HydrographInstance = Sequelize.Instance<IHydrograph> & IHydrograph;

type HydrographModel = Sequelize.Model<HydrographInstance, IHydrograph>;

const hydrographFactory = (sequalize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<IHydrograph> = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    data: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)), // eslint-disable-line
      allowNull: true,
    },
    percentille: {
      type: Sequelize.ENUM,
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
      type: Sequelize.ENUM,
      values: ['GAUGE', 'CLASS'],
    },
    gaugeId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    classId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
  };
  const Hydrograph = sequalize.define<HydrographInstance, IHydrograph>(
    'Hydrograph',
    attributes
  );

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
