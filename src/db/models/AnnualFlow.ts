import { Model, BuildOptions, DataTypes } from 'sequelize';
import { IDB } from './';

export interface IAnnualFlow {
  id?: number;
  year: number;
  flowData: number[] | string;
  gaugeId: number;
  updatedAt?: string;
  createdAt?: string;
}

export interface IAnnualFlowExtend extends Model {
  id?: number;
  year: number;
  flowData: number[] | string;
  gaugeId: number;
  updatedAt?: string;
  createdAt?: string;
}

type AnnualFlowModel = typeof Model &
  (new (values?: object, options?: BuildOptions) => IAnnualFlowExtend) & {
    associate: (model: IDB) => any;
  };

const annualFlowFactory = sequalize => {
  const AnnualFlow = <AnnualFlowModel>sequalize.define('AnnualFlow', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    flowData: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: false,
    },
    gaugeId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  });

  AnnualFlow.associate = (models: IDB) => {
    AnnualFlow.belongsTo(models.Gauge, {
      foreignKey: 'gaugeId',
      as: 'gauge',
    });
  };
  return AnnualFlow;
};

export { annualFlowFactory, AnnualFlowModel };
