import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export interface IGeoSite {
  id?: number;
  name?: string;
  identity: number | string;
  description: string;
  geometry: string;
  imageUrl: string;
  updatedAt?: string;
  createdAt?: string;
  geoClassId: number;
}

type GeoSiteInstance = Sequelize.Instance<IGeoSite> & IGeoSite;

type GeoSiteModel = Sequelize.Model<GeoSiteInstance, IGeoSite>;

const geoSiteFactory = (sequalize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<IGeoSite> = {
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
    identity: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    geometry: {
      type: Sequelize.JSONB,
      allowNull: true,
    },
    imageUrl: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    geoClassId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
  };
  const GeoSite = sequalize.define<GeoSiteInstance, IGeoSite>(
    'GeoSite',
    attributes
  );

  GeoSite.associate = models => {
    GeoSite.belongsTo(models.GeoClass, {
      foreignKey: 'geoClassId',
      as: 'geoClass',
    });
  };
  return GeoSite;
};

export { geoSiteFactory, GeoSiteModel };
