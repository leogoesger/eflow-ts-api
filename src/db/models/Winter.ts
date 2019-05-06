import { Model, BuildOptions, DataTypes } from 'sequelize';

import { IDB } from './';

export interface IWinter {
  id?: number;
  timing2: number[];
  timing5: number[];
  timing10: number[];
  timing20: number[];
  timing50: number[];
  duration2: number[];
  duration5: number[];
  duration10: number[];
  duration20: number[];
  duration50: number[];
  frequency2: number[];
  frequency5: number[];
  frequency10: number[];
  frequency20: number[];
  frequency50: number[];
  magnitude2: number[];
  magnitude5: number[];
  magnitude10: number[];
  magnitude20: number[];
  magnitude50: number[];
  gaugeId: number;
  updatedAt?: string;
  createdAt?: string;
}

interface IWinterExtends extends Model {
  id?: number;
  timing2: number[];
  timing5: number[];
  timing10: number[];
  timing20: number[];
  timing50: number[];
  duration2: number[];
  duration5: number[];
  duration10: number[];
  duration20: number[];
  duration50: number[];
  frequency2: number[];
  frequency5: number[];
  frequency10: number[];
  frequency20: number[];
  frequency50: number[];
  magnitude2: number[];
  magnitude5: number[];
  magnitude10: number[];
  magnitude20: number[];
  magnitude50: number[];
  gaugeId: number;
  updatedAt?: string;
  createdAt?: string;
}

type WinterModel = typeof Model &
  (new (values?: object, options?: BuildOptions) => IWinterExtends) & {
    findByToken: (d: any) => any;
  } & {
    associate: (model: IDB) => any;
  };

const winterFactory = sequalize => {
  const Winter = <WinterModel>sequalize.define('Winter', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    timing2: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    timing5: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    timing10: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    timing20: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    timing50: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    duration2: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    duration5: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    duration10: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    duration20: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    duration50: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    frequency2: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    frequency5: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    frequency10: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    frequency20: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    frequency50: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    magnitude2: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    magnitude5: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    magnitude10: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    magnitude20: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    magnitude50: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    gaugeId: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER,
    },
  });
  Winter.associate = models => {
    Winter.belongsTo(models.Gauge, {
      foreignKey: 'gaugeId',
      as: 'gauge',
    });
  };
  return Winter;
};

export { winterFactory, WinterModel };
