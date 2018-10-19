import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export interface IRelease {
  id: number;
  title: string;
  version: string;
  date: string;
  tasks: string[];
}

type ReleaseInstance = Sequelize.Instance<IRelease> & IRelease;

type ReleaseModel = Sequelize.Model<ReleaseInstance, IRelease>;

const releaseFactory = (sequalize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<IRelease> = {
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
    version: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    date: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    tasks: {
      type: Sequelize.ARRAY(Sequelize.TEXT),
      allowNull: true,
    },
  };
  const Release = sequalize.define<ReleaseInstance, IRelease>(
    'Release',
    attributes
  );

  return Release;
};

export { releaseFactory, ReleaseModel };
