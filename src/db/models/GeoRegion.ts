import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export interface IGeoRegion {
  id?: number;
  name?: string;
  description: string;
  abbreviation: string;
  updatedAt?: string;
  createdAt?: string;
}

type GeoRegionInstance = Sequelize.Instance<IGeoRegion> & IGeoRegion;

type GeoRegionModel = Sequelize.Model<GeoRegionInstance, IGeoRegion>;

const geoRegionFactory = (sequalize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<IGeoRegion> = {
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
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    abbreviation: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  };
  const GeoRegion = sequalize.define<GeoRegionInstance, IGeoRegion>(
    'GeoRegion',
    attributes
  );

  GeoRegion.associate = models => {
    GeoRegion.hasMany(models.GeoClass, {
      foreignKey: 'geoRegionId',
      as: 'geoClasses',
    });
  };
  return GeoRegion;
};

export { geoRegionFactory, GeoRegionModel };
