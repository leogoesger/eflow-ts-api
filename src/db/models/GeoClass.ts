import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export interface IGeoClass {
  id?: number;
  name?: string;
  description: string;
  defaultImageUrl: string;
  archetypes: string;
  medianAttributes: string;
  updatedAt?: string;
  createdAt?: string;
  geoRegionId: number;
  // hydroClassId: number;
}

type GeoClassInstance = Sequelize.Instance<IGeoClass> & IGeoClass;

type GeoClassModel = Sequelize.Model<GeoClassInstance, IGeoClass>;

const geoClassFactory = (sequalize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<IGeoClass> = {
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
    defaultImageUrl: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    archetypes: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    medianAttributes: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    geoRegionId: {
      allowNull: false,
      type: Sequelize.INTEGER,
    },
    // hydroClassId: {
    //   allowNull: false,
    //   type: Sequelize.INTEGER,
    // },
  };
  const GeoClass = sequalize.define<GeoClassInstance, IGeoClass>(
    'GeoClass',
    attributes
  );

  GeoClass.associate = (models) => {
    GeoClass.belongsTo(models.GeoRegion, {
      foreignKey: 'geoRegionId',
      as: 'geoRegion',
    });
    // GeoClass.belongsTo(models.Classification, {
    //   foreignKey: 'hydroClassId',
    //   as: 'hydroClasses',
    // });
    GeoClass.hasMany(models.GeoSite, {
      foreignKey: 'geoClassId',
      onDelete: 'cascade',
      as: 'geoSites',
    });
  };
  return GeoClass;
};

export { geoClassFactory, GeoClassModel };
