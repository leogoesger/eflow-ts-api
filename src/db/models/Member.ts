import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

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

type MemberInstance = Sequelize.Instance<IMember> & IMember;

type MemberModel = Sequelize.Model<MemberInstance, IMember>;

const memberFactory = (sequalize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<IMember> = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    title: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    image: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    location: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    website: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    linkedin: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    twitter: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    github: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    youtube: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    googleScholar: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    researchGate: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    email: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  };
  const Member = sequalize.define<MemberInstance, IMember>(
    'Member',
    attributes
  );

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
