import { BuildOptions, DataTypes, Model } from "sequelize";

import { db, IDB } from "./";

export enum Conditions {
  "DRY",
  "WET",
  "MODERATE",
  "NOT AVAILABLE"
}

export interface ICondition {
  id?: number;
  conditions: string[];
  gaugeId: number;
  updatedAt?: string;
  createdAt?: string;
}

export interface IConditionExtend extends Model {
  id?: number;
  conditions: string[];
  gaugeId: number;
  updatedAt?: string;
  createdAt?: string;
}

type ConditionModel = typeof Model &
  (new (values?: object, options?: BuildOptions) => IConditionExtend) & {
    associate: (model: IDB) => any;
  };

const conditionFactory = sequelize => {
  const Condition = <ConditionModel>sequelize.define("Condition", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    conditions: {
      type: DataTypes.ARRAY(
        DataTypes.ENUM("DRY", "WET", "MODERATE", "NOT AVAILABLE")
      ),
      allowNull: true
    },
    gaugeId: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  });

  Condition.associate = models => {
    Condition.belongsTo(models.Gauge, {
      foreignKey: "gaugeId",
      as: "gauge"
    });
  };
  return Condition;
};

export { conditionFactory, ConditionModel };
