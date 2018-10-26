import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export interface IYear {
  id?: number;
  year: number[];
  allYears: number[];
  gaugeId: number;
  updatedAt?: string;
  createdAt?: string;
}

type YearInstance = Sequelize.Instance<IYear> & IYear;

type YearModel = Sequelize.Model<YearInstance, IYear>;

const yearFactory = (sequalize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<IYear> = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    year: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: true,
    },
    allYears: {
      type: Sequelize.ARRAY(Sequelize.INTEGER),
      allowNull: true,
    },
    gaugeId: {
      allowNull: false,
      unique: true,
      type: Sequelize.INTEGER,
    },
  };
  const Year = sequalize.define<YearInstance, IYear>('Year', attributes);
  Year.associate = models => {
    Year.belongsTo(models.Gauge, {
      foreignKey: 'gaugeId',
      as: 'gauge',
    });
  };
  return Year;
};

export { yearFactory, YearModel };
