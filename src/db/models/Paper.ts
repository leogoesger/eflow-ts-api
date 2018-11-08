import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export enum PaperTypes {
  HYDROLOGY = 'HYDROLOGY',
  MORPHOLOGY = 'MORPHOLOGY',
  ECOLOGY = 'ECOLOGY',
  GENERAL = 'GENERAL',
}

export interface IPaper {
  id?: number;
  title: string;
  description: string;
  type: PaperTypes;
  authors: string[];
  journal?: string;
  publishedDate: string;
  paperUrl: string;
  imgUrl?: string;
  updatedAt?: string;
  createdAt?: string;
}

type PaperInstance = Sequelize.Instance<IPaper> & IPaper;

type PaperModel = Sequelize.Model<PaperInstance, IPaper>;

const paperFactory = (sequalize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<IPaper> = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    type: {
      type: Sequelize.ENUM,
      values: ['HYDROLOGY', 'MORPHOLOGY', 'ECOLOGY', 'GENERAL'],
    },
    authors: {
      type: Sequelize.ARRAY(Sequelize.TEXT), // eslint-disable-line
      allowNull: true,
    },
    journal: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    publishedDate: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    paperUrl: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    imgUrl: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  };
  const Paper = sequalize.define<PaperInstance, IPaper>('Paper', attributes);

  Paper.associate = models => {
    Paper.belongsToMany(models.Member, {
      through: models.MemberPaper,
      foreignKey: 'paperId',
      as: 'members',
    });
  };
  return Paper;
};

export { paperFactory, PaperModel };
