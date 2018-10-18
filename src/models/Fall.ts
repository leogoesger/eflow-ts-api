import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export interface IFall {
  id: number;
  timing: number[];
  magnitude: number[];
  timingWet: number[];
  duration: number[];
}

type FallInstance = Sequelize.Instance<IFall> & IFall;

type FallModel = Sequelize.Model<FallInstance, IFall>;

const fallFactory = (sequalize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<IFall> = {
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
    timingWet: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    duration: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
  };
  const Fall = sequalize.define<FallInstance, IFall>('Fall', attributes);

  Fall.associate = models => {
    Fall.belongsTo(models.Gauge, {
      foreignKey: 'gaugeId',
      as: 'gauge',
    });
  };
  return Fall;
};

export { fallFactory, FallModel };
