import { Model, BuildOptions, DataTypes } from 'sequelize';

import { IDB } from './';

export interface IGeoSite {
  id?: number;
  name?: string;
  identity: number | string;
  description?: string;
  geometry: string;
  imageUrl: string;
  updatedAt?: string;
  createdAt?: string;
  geoClassId: number;
}

interface IGeoSiteExtend extends Model {
  id?: number;
  name?: string;
  identity: number | string;
  description?: string;
  geometry: string;
  imageUrl: string;
  updatedAt?: string;
  createdAt?: string;
  geoClassId: number;
}

type GeoSiteModel = typeof Model &
  (new (values?: object, options?: BuildOptions) => IGeoSiteExtend) & {
    associate: (model: IDB) => any;
  };

const geoSiteFactory = sequalize => {
  const GeoSite = <GeoSiteModel>sequalize.define('GeoSite', {
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
    identity: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    geometry: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    geoClassId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  });

  GeoSite.associate = models => {
    GeoSite.belongsTo(models.GeoClass, {
      foreignKey: 'geoClassId',
      as: 'geoClass',
    });
  };
  return GeoSite;
};

export { geoSiteFactory, GeoSiteModel };
