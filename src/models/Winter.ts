import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export interface IWinter {
  id: number;
  timing2: number[];
  timing5: number[];
  timing10: number[];
  timing20: number[];
  timing50: number[];
  duration2: number[];
  duration5: number[];
  duration10: number[];
  duration20: number[];
  duration50: number[];
  frequency2: number[];
  frequency5: number[];
  frequency10: number[];
  frequency20: number[];
  frequency50: number[];
  magnitude2: number[];
  magnitude5: number[];
  magnitude10: number[];
  magnitude20: number[];
  magnitude50: number[];
}

type WinterInstance = Sequelize.Instance<IWinter> & IWinter;

type WinterModel = Sequelize.Model<WinterInstance, IWinter>;

const winterFactory = (sequalize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<IWinter> = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    timing2: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    timing5: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    timing10: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    timing20: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    timing50: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    duration2: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    duration5: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    duration10: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    duration20: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    duration50: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    frequency2: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    frequency5: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    frequency10: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    frequency20: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    frequency50: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    magnitude2: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    magnitude5: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    magnitude10: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    magnitude20: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    magnitude50: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
  };
  const Winter = sequalize.define<WinterInstance, IWinter>(
    'Winter',
    attributes
  );
  Winter.associate = models => {
    Winter.belongsTo(models.Gauge, {
      foreignKey: 'gaugeId',
      as: 'gauge',
    });
  };
  return Winter;
};

export { winterFactory, WinterModel };
