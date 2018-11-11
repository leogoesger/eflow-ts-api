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
import { geoClassFactory, GeoClassModel, IGeoClass } from './GeoClass';
import { geoRegionFactory, GeoRegionModel, IGeoRegion } from './GeoRegion';
import { geoSiteFactory, GeoSiteModel, IGeoSite } from './GeoSite';
import { hydrographFactory, HydrographModel, IHydrograph } from './Hydrograph';
import { memberFactory, MemberModel, IMember } from './Member';
import {
  memberPaperFactory,
  MemberPaperModel,
  IMemberPaper,
} from './MemberPaper';
import { paperFactory, PaperModel, IPaper } from './Paper';
import { releaseFactory, ReleaseModel, IRelease } from './Release';
import { springFactory, SpringModel, ISpring } from './Spring';
import { summerFactory, SummerModel, ISummer } from './Summer';
import { tsUploadFactory, TsUploadModel, ITsUpload } from './TsUpload';
import { userFactory, UserModel, IUser, UserRole } from './User';
import { winterFactory, WinterModel, IWinter } from './Winter';
import { yearFactory, YearModel, IYear } from './Year';

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
  Classification: ClassificationModel;
  Fall: FallModel;
  FallWinter: FallWinterModel;
  Gauge: GaugeModel;
  GeoClass: GeoClassModel;
  GeoRegion: GeoRegionModel;
  GeoSite: GeoSiteModel;
  Hydrograph: HydrographModel;
  Member: MemberModel;
  MemberPaper: MemberPaperModel;
  Paper: PaperModel;
  Release: ReleaseModel;
  Spring: SpringModel;
  Summer: SummerModel;
  TsUpload: TsUploadModel;
  User: UserModel;
  Winter: WinterModel;
  Year: YearModel;

  Sequelize: Sequelize.SequelizeStatic;
  sequelize: Sequelize.Sequelize;
}

const db: IDB = {
  AllYear: allYearFactory(sequelize),
  AnnualFlow: annualFlowFactory(sequelize),
  Classification: classificationFactory(sequelize),
  Fall: fallFactory(sequelize),
  FallWinter: fallWinterFactory(sequelize),
  Gauge: gaugeFactory(sequelize),
  GeoClass: geoClassFactory(sequelize),
  GeoRegion: geoRegionFactory(sequelize),
  GeoSite: geoSiteFactory(sequelize),
  Hydrograph: hydrographFactory(sequelize),
  Member: memberFactory(sequelize),
  MemberPaper: memberPaperFactory(sequelize),
  Paper: paperFactory(sequelize),
  Release: releaseFactory(sequelize),
  Spring: springFactory(sequelize),
  Summer: summerFactory(sequelize),
  TsUpload: tsUploadFactory(sequelize),
  User: userFactory(sequelize),
  Winter: winterFactory(sequelize),
  Year: yearFactory(sequelize),

  Sequelize,
  sequelize,
};

(<any>Object).values(db).forEach((model: any) => {
  if (model.associate) {
    model.associate(db);
  }
});

const {
  AllYear,
  AnnualFlow,
  Classification,
  Fall,
  FallWinter,
  Gauge,
  GeoClass,
  GeoRegion,
  GeoSite,
  Hydrograph,
  Member,
  MemberPaper,
  Paper,
  Release,
  Spring,
  Summer,
  TsUpload,
  User,
  Winter,
  Year,
} = db;

export {
  AllYear,
  AnnualFlow,
  Classification,
  Fall,
  FallWinter,
  Gauge,
  GeoClass,
  GeoRegion,
  GeoSite,
  Hydrograph,
  Member,
  MemberPaper,
  Paper,
  Release,
  Spring,
  Summer,
  TsUpload,
  User,
  Winter,
  Year,
  IAllYear,
  IAnnualFlow,
  IClassification,
  IFall,
  IFallWinter,
  IGauge,
  IGeoClass,
  IGeoRegion,
  IGeoSite,
  IHydrograph,
  IMember,
  IMemberPaper,
  IPaper,
  IRelease,
  ISpring,
  ISummer,
  ITsUpload,
  IUser,
  UserRole,
  IWinter,
  IYear,
  db,
};
