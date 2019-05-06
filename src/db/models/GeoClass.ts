import { Model, BuildOptions, DataTypes } from 'sequelize';

import { IDB } from './';

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

interface IGeoClassExtend extends Model {
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

type GeoClassModel = typeof Model &
  (new (values?: object, options?: BuildOptions) => IGeoClassExtend) & {
    associate: (model: IDB) => any;
  };

const geoClassFactory = sequalize => {
  const GeoClass = <GeoClassModel>sequalize.define('GeoClass', {
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
    defaultImageUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    archetypes: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    medianAttributes: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    geoRegionId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    // hydroClassId: {
    //   allowNull: false,
    //   type: DataTypes.INTEGER,
    // },
  });

  GeoClass.associate = models => {
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
