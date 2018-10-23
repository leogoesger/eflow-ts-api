import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export interface ISummer {
  id: number;
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

type SummerInstance = Sequelize.Instance<ISummer> & ISummer;

type SummerModel = Sequelize.Model<SummerInstance, ISummer>;

const summerFactory = (sequalize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<ISummer> = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    timing: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    magnitude10: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    magnitude50: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    durationFlush: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    durationWet: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    noFlowCount: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    gaugeId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
  };
  const Summer = sequalize.define<SummerInstance, ISummer>(
    'Summer',
    attributes
  );
  Summer.associate = models => {
    Summer.belongsTo(models.Gauge, {
      foreignKey: 'gaugeId',
      as: 'gauge',
    });
  };
  return Summer;
};

export { summerFactory, SummerModel };
