import { Model, BuildOptions, DataTypes } from 'sequelize';

import { IDB } from './';

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

interface IPaperExtend extends Model {
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

type PaperModel = typeof Model &
  (new (values?: object, options?: BuildOptions) => IPaperExtend) & {
    associate: (model: IDB) => any;
  };

const paperFactory = sequalize => {
  const Paper = <PaperModel>sequalize.define('Paper', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM,
      values: ['HYDROLOGY', 'MORPHOLOGY', 'ECOLOGY', 'GENERAL'],
    },
    authors: {
      type: DataTypes.ARRAY(DataTypes.TEXT), // eslint-disable-line
      allowNull: true,
    },
    journal: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    publishedDate: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    paperUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    imgUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

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
