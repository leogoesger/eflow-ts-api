// src/db/models/index.js

import * as Sequelize from 'sequelize';
import { config } from '../config/config';

import { allYearFactory, AllYearModel, IAllYear } from './AllYear';
import { annualFlowFactory, AnnualFlowModel, IAnnualFlow } from './AnnualFlow';
import {
  classificationFactory,
  ClassificationModel,
  IClassification,
} from './Classification';
import { fallFactory, FallModel, IFall } from './Fall';
import { fallWinterFactory, FallWinterModel, IFallWinter } from './FallWinter';
import { gaugeFactory, GaugeModel, IGauge } from './Gauge';

const env = process.env.NODE_ENV || 'development';
const configEnv = config[env] as any;

const sequelize = new Sequelize(
  configEnv.database,
  configEnv.username,
  config.password,
  configEnv
);

export interface IDB {
  AllYear: AllYearModel;
  AnnualFlow: AnnualFlowModel;
  Gauge: GaugeModel;
  Classification: ClassificationModel;
  Fall: FallModel;
  FallWinter: FallWinterModel;

  Sequelize: Sequelize.SequelizeStatic;
  sequelize: Sequelize.Sequelize;
}

const db: IDB = {
  AllYear: allYearFactory(sequelize),
  AnnualFlow: annualFlowFactory(sequelize),
  Gauge: gaugeFactory(sequelize),
  Classification: classificationFactory(sequelize),
  Fall: fallFactory(sequelize),
  FallWinter: fallWinterFactory(sequelize),

  Sequelize,
  sequelize,
};

(<any>Object).values(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db);
  }
});

const { AllYear, AnnualFlow, Classification, Fall, FallWinter, Gauge } = db;

export {
  AllYear,
  IAllYear,
  AnnualFlow,
  IAnnualFlow,
  Classification,
  IClassification,
  Fall,
  IFall,
  FallWinter,
  IFallWinter,
  Gauge,
  IGauge,
  db,
};
