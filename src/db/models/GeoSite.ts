import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export interface IGeoSite {
  id: number;
  name: string;
  identity: string;
  description: string;
  geometry: string;
  imageUrl: string;
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
