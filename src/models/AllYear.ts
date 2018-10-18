import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export interface IAllYear {
  id: number;
  average: number[];
  standardDeviation: number[];
  coeffientVariance: number[];
}

type AllYearInstance = Sequelize.Instance<IAllYear> & IAllYear;

type AllYearModel = Sequelize.Model<AllYearInstance, IAllYear>;

const allYearFactory = (sequalize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<IAllYear> = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    average: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    standardDeviation: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
    coeffientVariance: {
      type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
      allowNull: true,
    },
  };
  const AllYear = sequalize.define<AllYearInstance, IAllYear>(
    'AllYear',
    attributes
  );

  AllYear.associate = models => {
    AllYear.belongsTo(models.Gauge, {
      foreignKey: 'gaugeId',
      as: 'gauge',
    });
  };
  return AllYear;
};

export { allYearFactory, AllYearModel };
