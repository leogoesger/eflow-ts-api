import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

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

type SpringInstance = Sequelize.Instance<ISpring> & ISpring;

type SpringModel = Sequelize.Model<SpringInstance, ISpring>;

const springFactory = (sequalize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<ISpring> = {
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
    magnitude: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    rateOfChange: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    duration: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    gaugeId: {
      allowNull: false,
      unique: true,
      type: Sequelize.INTEGER,
    },
  };
  const Spring = sequalize.define<SpringInstance, ISpring>(
    'Spring',
    attributes
  );
  Spring.associate = models => {
    Spring.belongsTo(models.Gauge, {
      foreignKey: 'gaugeId',
      as: 'gauge',
    });
  };
  return Spring;
};

export { springFactory, SpringModel };
