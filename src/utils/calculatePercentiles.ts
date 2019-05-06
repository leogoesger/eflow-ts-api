import * as d3 from 'd3';
import { from, of } from 'rxjs';
import { map, catchError, concatMap } from 'rxjs/operators';
import { Request, Response } from 'express';
import {
  AllYear,
  Classification,
  Fall,
  FallWinter,
  Gauge,
  Spring,
  Summer,
  Winter,
} from '../db/models';
import { metricReferenceAs } from '../static/metricReference';
import { getCalenderDate, getJulianOffsetDate, removeNaN } from './helpers';
import { classes } from '../static/allClasses';

interface IReport {
  classes?: number[];
  gauges?: number[];
  meta: { gaugeCount: number; rowCount: number };
}

const attributes: any = {
  winters: [
    'timing2',
    'timing5',
    'timing10',
    'timing20',
    'timing50',
    'duration2',
    'duration5',
    'duration10',
    'duration20',
    'duration50',
    'frequency2',
    'frequency5',
    'frequency10',
    'frequency20',
    'frequency50',
    'magnitude2',
    'magnitude5',
    'magnitude10',
    'magnitude20',
    'magnitude50',
  ],
  summers: [
    'timing',
    'magnitude10',
    'magnitude50',
    'durationFlush',
    'durationWet',
    'noFlowCount',
  ],
  allYears: ['average', 'standardDeviation', 'coeffientVariance'],
  falls: ['timing', 'magnitude', 'timingWet', 'duration'],
  springs: ['timing', 'magnitude', 'rateOfChange', 'duration'],
  fallWinters: ['magWet'],
};

interface IClsPercentilePromise {
  classId: number;
  combined: any;
}

export const calculatePercentileClourse = async (
  req: Request,
  res: Response
) => {
  const report: IReport = {
    classes: [],
    meta: { gaugeCount: 0, rowCount: 0 },
  };

  const src$ = from(classes).pipe(
    concatMap(cls => calculatePercentile(cls.id)),
    map((cls: IClsPercentilePromise) =>
      combineMetrics(cls.classId, cls.combined)
    ),
    catchError(err => of(`Bad Promise: ${err}`))
  );

  src$.subscribe(
    async ({ classId, combinedPercentile }: any) => {
      report.classes.push(classId);
      report.meta.gaugeCount =
        report.meta.gaugeCount +
        classes.filter(cls => cls.id === classId)[0].gaugeCount;
      report.meta.rowCount++;

      const updateClass = await Classification.findByPk(classId);
      await updateClass.update(combinedPercentile, {
        fields: Object.keys(combinedPercentile),
      });
    },
    (err: any) =>
      res
        .status(400)
        .send({ ...report, Error: `Unable to update Class: ${err}` }),
    () => {
      res.status(200).send(report);
    }
  );
};

const calculatePercentile = async (
  classId: number
): Promise<IClsPercentilePromise> => {
  const gauges = await Gauge.findAll({
    where: { classId },
    include: [
      {
        model: AllYear,
        as: 'allYears',
        attributes: attributes.allYears,
      },
      {
        model: Fall,
        as: 'falls',
        attributes: attributes.falls,
      },
      {
        model: Spring,
        as: 'springs',
        attributes: attributes.springs,
      },
      {
        model: Summer,
        as: 'summers',
        attributes: attributes.summers,
      },
      {
        model: Winter,
        as: 'winters',
        attributes: attributes.winters,
      },
      {
        model: FallWinter,
        as: 'fallWinters',
        attributes: attributes.fallWinters,
      },
    ],
  });

  const combined: any = {};
  metricReferenceAs.forEach(reference => {
    combined[reference.short] = [];
    gauges.forEach(gauge => {
      if (gauge[reference.as][0]) {
        let data = [];
        if (
          reference.name.includes('Timing') &&
          !reference.name.includes('summer')
        ) {
          data = gauge[reference.as][0][reference.columnName].map((d: any) =>
            getJulianOffsetDate(Number(d))
          );
        } else {
          data = gauge[reference.as][0][reference.columnName];
        }
        combined[reference.short] = [...combined[reference.short], ...data];
      }
    });
  });
  return { classId, combined };
};

const combineMetrics = (classId: number, combined: any): any => {
  const combinedPercentile: any = {};
  Object.keys(combined).forEach(key => {
    const sortedData = removeNaN(combined[key]);
    combinedPercentile[key] = [
      d3.quantile(sortedData, 0.1),
      d3.quantile(sortedData, 0.5),
      d3.quantile(sortedData, 0.9),
    ];
  });

  metricReferenceAs.forEach(reference => {
    if (
      reference.name.includes('Timing') &&
      !reference.name.includes('summer')
    ) {
      combinedPercentile[reference.short] = combinedPercentile[
        reference.short
      ].map((d: any) => getCalenderDate(Number(d)));
    }
  });

  return { classId, combinedPercentile };
};

export const updateGaugePercentiles = async (req: Request, res: Response) => {
  const report: IReport = {
    classes: [],
    gauges: [],
    meta: { gaugeCount: 0, rowCount: 0 },
  };
  const gauges = await Gauge.findAll({
    where: { classId: req.params.id },
    include: [
      {
        model: AllYear,
        as: 'allYears',
        attributes: attributes.allYears,
      },
      {
        model: Fall,
        as: 'falls',
        attributes: attributes.falls,
      },
      {
        model: Spring,
        as: 'springs',
        attributes: attributes.springs,
      },
      {
        model: Summer,
        as: 'summers',
        attributes: attributes.summers,
      },
      {
        model: Winter,
        as: 'winters',
        attributes: attributes.winters,
      },
      {
        model: FallWinter,
        as: 'fallWinters',
        attributes: attributes.fallWinters,
      },
    ],
  });

  const src$ = from(gauges).pipe(
    map(gauge => calcGaugePercentile(gauge)),
    catchError(err =>
      of(
        `Unable to update gauges for class id: ${
          req.params.id
        }\n\tError: ${err}`
      )
    )
  );

  src$.subscribe(
    async ({ gauge, metrics, fields }: any) => {
      if (report.classes.indexOf(req.params.id) === -1)
        report.classes.push(req.params.id);
      report.gauges.push(gauge.id);
      report.meta.gaugeCount++;
      report.meta.rowCount++;
      await gauge.update(metrics, fields);
    },
    (err: any) =>
      res
        .status(400)
        .send({ ...report, Error: `Unable to update Gauge: ${err}` }),
    () => {
      res.status(200).send(report);
    }
  );
};

const calcGaugePercentile = (gauge: any): any => {
  const metrics: any = {};
  metricReferenceAs.forEach(reference => {
    let data;
    if (
      reference.name.includes('Timing') &&
      !reference.name.includes('summer')
    ) {
      data = gauge[reference.as][0][reference.columnName].map((d: any) =>
        getJulianOffsetDate(Number(d))
      );
    } else {
      data = gauge[reference.as][0][reference.columnName];
    }

    const sortedData = removeNaN(data);

    metrics[reference.short] = [
      d3.quantile(sortedData, 0.1) || null,
      d3.quantile(sortedData, 0.5) || null,
      d3.quantile(sortedData, 0.9) || null,
    ];
  });

  metricReferenceAs.forEach(reference => {
    if (
      reference.name.includes('Timing') &&
      !reference.name.includes('summer')
    ) {
      metrics[reference.short] = metrics[reference.short].map((d: any) =>
        getCalenderDate(Number(d))
      );
    }
  });

  return { gauge, metrics, fields: Object.keys(metrics) };
};
