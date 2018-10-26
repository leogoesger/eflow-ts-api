import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export interface IFallWinter {
  id?: number;
  magWet: number[];
  gaugeId: number;
  updatedAt?: string;
  createdAt?: string;
}

type FallWinterInstance = Sequelize.Instance<IFallWinter> & IFallWinter;

type FallWinterModel = Sequelize.Model<FallWinterInstance, IFallWinter>;

const fallWinterFactory = (sequalize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<IFallWinter> = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    magWet: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    gaugeId: {
      allowNull: false,
      unique: true,
      type: Sequelize.INTEGER,
    },
  };
  const FallWinter = sequalize.define<FallWinterInstance, IFallWinter>(
    'FallWinter',
    attributes
  );

  FallWinter.associate = models => {
    FallWinter.belongsTo(models.Gauge, {
      foreignKey: 'gaugeId',
      as: 'gauge',
    });
  };
  return FallWinter;
};

export { fallWinterFactory, FallWinterModel };
