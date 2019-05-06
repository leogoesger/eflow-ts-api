import { Model, BuildOptions, DataTypes } from 'sequelize';

import { IDB } from './';

export interface IRelease {
  id: number;
  title: string;
  version: string;
  date: string;
  tasks: string[];
}

interface IReleaseExtend extends Model {
  id: number;
  title: string;
  version: string;
  date: string;
  tasks: string[];
}

type ReleaseModel = typeof Model &
  (new (values?: object, options?: BuildOptions) => IReleaseExtend) & {
    associate: (model: IDB) => any;
  };

const releaseFactory = sequalize => {
  const Release = <ReleaseModel>sequalize.define('Release', {
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
    version: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    date: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    tasks: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
  });

  return Release;
};

export { releaseFactory, ReleaseModel };
