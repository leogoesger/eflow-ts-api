import { Model, BuildOptions, DataTypes } from 'sequelize';

import { IDB } from './';
export interface IGeoRegion {
  id?: number;
  name?: string;
  description: string;
  abbreviation: string;
  updatedAt?: string;
  createdAt?: string;
}

interface IGeoRegionExtend extends Model {
  id?: number;
  name?: string;
  description: string;
  abbreviation: string;
  updatedAt?: string;
  createdAt?: string;
}

type GeoRegionModel = typeof Model &
  (new (values?: object, options?: BuildOptions) => IGeoRegionExtend) & {
    associate: (model: IDB) => any;
  };

const geoRegionFactory = sequalize => {
  const GeoRegion = <GeoRegionModel>sequalize.define('GeoRegion', {
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
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    abbreviation: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  GeoRegion.associate = models => {
    GeoRegion.hasMany(models.GeoClass, {
      foreignKey: 'geoRegionId',
      onDelete: 'cascade',
      as: 'geoClasses',
    });
  };
  return GeoRegion;
};

export { geoRegionFactory, GeoRegionModel };
