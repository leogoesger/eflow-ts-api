import { Model, BuildOptions, DataTypes } from 'sequelize';
import { IDB } from './';

export interface IGauge {
  id: number;
  stationName: string;
  geometry: string;
  unimpairedStartYear: number;
  unimpairedEndYear: number;
  Avg: number[];
  Std: number[];
  CV: number[];
  SP_Tim: number[];
  SP_Mag: number[];
  SP_Dur: number[];
  SP_ROC: number[];
  DS_Tim: number[];
  DS_Mag_10: number[];
  DS_Mag_50: number[];
  DS_Dur_WSI: number[];
  DS_Dur_WS: number[];
  DS_No_Flow: number[];
  WSI_Tim: number[];
  WSI_Mag: number[];
  Wet_Tim: number[];
  WSI_Dur: number[];
  Wet_BFL_Mag: number[];
  Peak_Mag_2: number[];
  Peak_Tim_2: number[];
  Peak_Dur_2: number[];
  Peak_Fre_2: number[];
  Peak_Mag_5: number[];
  Peak_Tim_5: number[];
  Peak_Dur_5: number[];
  Peak_Fre_5: number[];
  Peak_Tim_10: number[];
  Peak_Dur_10: number[];
  Peak_Fre_10: number[];
  Peak_Mag_20: number[];
  Peak_Tim_20: number[];
  Peak_Dur_20: number[];
  Peak_Fre_20: number[];
  Peak_Mag_50: number[];
  Peak_Tim_50: number[];
  Peak_Dur_50: number[];
  Peak_Fre_50: number[];
  classId: number;
  [key: string]: any;
  updatedAt?: string;
  createdAt?: string;
}
export interface IGaugeExtend extends Model {
  id: number;
  stationName: string;
  geometry: string;
  unimpairedStartYear: number;
  unimpairedEndYear: number;
  Avg: number[];
  Std: number[];
  CV: number[];
  SP_Tim: number[];
  SP_Mag: number[];
  SP_Dur: number[];
  SP_ROC: number[];
  DS_Tim: number[];
  DS_Mag_10: number[];
  DS_Mag_50: number[];
  DS_Dur_WSI: number[];
  DS_Dur_WS: number[];
  DS_No_Flow: number[];
  WSI_Tim: number[];
  WSI_Mag: number[];
  Wet_Tim: number[];
  WSI_Dur: number[];
  Wet_BFL_Mag: number[];
  Peak_Mag_2: number[];
  Peak_Tim_2: number[];
  Peak_Dur_2: number[];
  Peak_Fre_2: number[];
  Peak_Mag_5: number[];
  Peak_Tim_5: number[];
  Peak_Dur_5: number[];
  Peak_Fre_5: number[];
  Peak_Tim_10: number[];
  Peak_Dur_10: number[];
  Peak_Fre_10: number[];
  Peak_Mag_20: number[];
  Peak_Tim_20: number[];
  Peak_Dur_20: number[];
  Peak_Fre_20: number[];
  Peak_Mag_50: number[];
  Peak_Tim_50: number[];
  Peak_Dur_50: number[];
  Peak_Fre_50: number[];
  classId: number;
  [key: string]: any;
  updatedAt?: string;
  createdAt?: string;
}

type GaugeModel = typeof Model &
  (new (values?: object, options?: BuildOptions) => IGaugeExtend) & {
    associate: (model: IDB) => any;
  };

const gaugeFactory = sequalize => {
  const Gauge = <GaugeModel>sequalize.define('Gauge', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    stationName: { type: DataTypes.STRING, allowNull: false },
    geometry: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    unimpairedStartYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    unimpairedEndYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    Avg: { type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)), allowNull: true },
    Std: { type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)), allowNull: true },
    CV: { type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)), allowNull: true },
    SP_Tim: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    SP_Mag: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    SP_Dur: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    SP_ROC: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    DS_Tim: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    DS_Mag_10: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    DS_Mag_50: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    DS_Dur_WSI: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    DS_Dur_WS: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    DS_No_Flow: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    WSI_Tim: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    WSI_Mag: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    Wet_Tim: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    WSI_Dur: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    Wet_BFL_Mag: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    Peak_Mag_2: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    Peak_Tim_2: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    Peak_Dur_2: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    Peak_Fre_2: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    Peak_Mag_5: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    Peak_Tim_5: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    Peak_Dur_5: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    Peak_Fre_5: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    Peak_Tim_10: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    Peak_Dur_10: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    Peak_Fre_10: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    Peak_Mag_20: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    Peak_Tim_20: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    Peak_Dur_20: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    Peak_Fre_20: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    Peak_Mag_50: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    Peak_Tim_50: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    Peak_Dur_50: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    Peak_Fre_50: {
      type: DataTypes.ARRAY(DataTypes.DECIMAL(10, 2)),
      allowNull: true,
    },
    classId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  });
  Gauge.associate = (models: IDB) => {
    Gauge.belongsTo(models.Classification, {
      foreignKey: 'classId',
      as: 'classes',
    });
    Gauge.hasMany(models.AllYear, {
      foreignKey: 'gaugeId',
      onDelete: 'cascade',
      as: 'allYears',
    });
    Gauge.hasMany(models.AnnualFlow, {
      foreignKey: 'gaugeId',
      onDelete: 'cascade',
      as: 'annualFlows',
    });
    Gauge.hasMany(models.Fall, {
      foreignKey: 'gaugeId',
      onDelete: 'cascade',
      as: 'falls',
    });
    Gauge.hasMany(models.FallWinter, {
      foreignKey: 'gaugeId',
      onDelete: 'cascade',
      as: 'fallWinters',
    });
    Gauge.hasMany(models.Hydrograph, {
      foreignKey: 'gaugeId',
      onDelete: 'cascade',
      as: 'hydrographs',
    });
    Gauge.hasMany(models.Spring, {
      foreignKey: 'gaugeId',
      onDelete: 'cascade',
      as: 'springs',
    });
    Gauge.hasMany(models.Summer, {
      foreignKey: 'gaugeId',
      onDelete: 'cascade',
      as: 'summers',
    });
    Gauge.hasMany(models.Winter, {
      foreignKey: 'gaugeId',
      onDelete: 'cascade',
      as: 'winters',
    });
    Gauge.hasMany(models.Year, {
      foreignKey: 'gaugeId',
      onDelete: 'cascade',
      as: 'years',
    });
    Gauge.hasMany(models.Condition, {
      foreignKey: 'gaugeId',
      onDelete: 'cascade',
      as: 'conditions',
    });
  };

  return Gauge;
};

export { gaugeFactory, GaugeModel };
