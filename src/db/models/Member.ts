import { Model, BuildOptions, DataTypes } from 'sequelize';

import { IDB } from './';

export interface IMember {
  id?: number;
  name: string;
  description: string;
  title: string;
  image: string;
  location: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  youtube?: string;
  googleScholar?: string;
  researchGate?: string;
  email: string;
  updatedAt?: string;
  createdAt?: string;
}

interface IMemberExtend extends Model {
  id?: number;
  name: string;
  description: string;
  title: string;
  image: string;
  location: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  youtube?: string;
  googleScholar?: string;
  researchGate?: string;
  email: string;
  updatedAt?: string;
  createdAt?: string;
}

type MemberModel = typeof Model &
  (new (values?: object, options?: BuildOptions) => IMemberExtend) & {
    associate: (model: IDB) => any;
  };

const memberFactory = sequalize => {
  const Member = <MemberModel>sequalize.define('Member', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    website: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    linkedin: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    twitter: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    github: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    youtube: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    googleScholar: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    researchGate: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  Member.associate = models => {
    Member.belongsToMany(models.Paper, {
      through: models.MemberPaper,
      foreignKey: 'memberId',
      as: 'papers',
    });
  };
  return Member;
};

export { memberFactory, MemberModel };
