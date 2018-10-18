import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export interface IAnnualFlow {
  id: number;
  year: number[];
  flowData: number[];
}

type AnnualFlowInstance = Sequelize.Instance<IAnnualFlow> & IAnnualFlow;

type AnnualFlowModel = Sequelize.Model<AnnualFlowInstance, IAnnualFlow>;

const annualFlowFactory = (sequalize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<IAnnualFlow> = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    year: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    flowData: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
  };
  const AnnualFlow = sequalize.define<AnnualFlowInstance, IAnnualFlow>(
    'AnnualFlow',
    attributes
  );

  AnnualFlow.associate = models => {
    AnnualFlow.belongsTo(models.Gauge, {
      foreignKey: 'gaugeId',
      as: 'gauge',
    });
  };
  return AnnualFlow;
};

export { annualFlowFactory, AnnualFlowModel };
