import { BuildOptions, DataTypes, Model } from "sequelize";

import { IDB } from "./";
export interface IFallWinter {
  id?: number;
  magWet: number[];
  gaugeId: number;
  updatedAt?: string;
  createdAt?: string;
}

interface IFallWinterExtend extends Model {
  id?: number;
  magWet: number[];
  gaugeId: number;
  updatedAt?: string;
  createdAt?: string;
}

type FallWinterModel = typeof Model &
  (new (values?: object, options?: BuildOptions) => IFallWinterExtend) & {
    associate: (model: IDB) => any;
  };

const fallWinterFactory = sequalize => {
  const FallWinter = <FallWinterModel>sequalize.define("FallWinter", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    magWet: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true
    },
    gaugeId: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER
    }
  });

  FallWinter.associate = models => {
    FallWinter.belongsTo(models.Gauge, {
      foreignKey: "gaugeId",
      as: "gauge"
    });
  };
  return FallWinter;
};

export { fallWinterFactory, FallWinterModel };
