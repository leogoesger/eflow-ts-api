import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export enum Conditions {
  'DRY',
  'WET',
  'MODERATE',
  'NOT AVAILABLE',
}

export interface ICondition {
  id?: number;
  conditions: string[];
  gaugeId: number;
  updatedAt?: string;
  createdAt?: string;
}

type ConditionInstance = Sequelize.Instance<ICondition> & ICondition;
type ConditionModel = Sequelize.Model<ConditionInstance, ICondition>;

const conditionFactory = (sequelize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<ICondition> = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    conditions: {
      type: Sequelize.ARRAY(
        Sequelize.ENUM('DRY', 'WET', 'MODERATE', 'NOT AVAILABLE')
      ),
      allowNull: true,
    },
    gaugeId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
  };
  const Condition = sequelize.define<ConditionInstance, ICondition>(
    'Condition',
    attributes
  );

  Condition.associate = (models) => {
    Condition.belongsTo(models.Gauge, {
      foreignKey: 'gaugeId',
      as: 'gauge',
    });
  };
  return Condition;
};

export { conditionFactory, ConditionModel };
