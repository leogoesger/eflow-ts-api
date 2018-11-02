import { Request, Response } from 'express';
import { from, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Model } from 'sequelize';

import { gauges, metricReference } from '../../static';
import {
  readCSVFile,
  readStringToArrays,
  IReadStringToArrayPL,
  ITransposeArrayPL,
  clearDB,
} from './helpers';
import {
  Year,
  AllYear,
  Fall,
  Winter,
  Summer,
  Spring,
  FallWinter,
} from '../../db/models';

interface IDbObjects {
  dbObj: { [index: string]: any };
  gaugeId: number;
}

interface ITables {
  [index: string]: Model<any, any>;
}

interface IReport {
  [index: string]: {
    gauges: number[];
    count: number;
  };
}

/**
 * Load csv for Metric Result from AWS via rxjs 
 *   
 * 1. First clear out the databse 
   2. Read CSV from aws
   3. Convert string to arrays
 *
 * Subscribe take three functions: onNext, onError, onComplete.
 * 
 * `onNext` takes each emitted value and store it into a global object
 * 
 * `onComplete` takes the final object to `bulkCreate`
 */
export const uploadMetricResult = async (req: Request, res: Response) => {
  const tables = {
    Year: Year,
    AllYear: AllYear,
    Spring: Spring,
    Summer: Summer,
    Fall: Fall,
    FallWinter: FallWinter,
    Winter: Winter,
  } as any;

  const dbObjects: { [index: string]: any[] } = {};
  Object.keys(tables).forEach(key => (dbObjects[key] = []));

  await clearDB(Object.values(tables));

  const src$ = from(gauges).pipe(
    mergeMap(gauge =>
      readCSVFile(gauge.id, 'annual_flow_result', '_annual_result_matrix')
    ),
    mergeMap((d: IReadStringToArrayPL) => readStringToArrays(d)),
    map((d: ITransposeArrayPL) => createDbObjects(d, tables)),
    catchError(error => of(`Bad Promise: ${error}`))
  );

  src$.subscribe(
    ({ dbObj, gaugeId }: IDbObjects) => {
      Object.keys(dbObj).forEach(key => dbObjects[key].push(dbObj[key]));
      console.log(gaugeId);
    },
    (error: any) => res.status(400).send(error),
    () =>
      uploadDB(dbObjects, tables)
        .then(d => res.status(200).send(d))
        .catch(err => res.status(400).send(err))
  );
};

const createDbObjects = (
  { arrayData, id }: ITransposeArrayPL,
  tables: ITables
): IDbObjects => {
  const dbObj: { [index: string]: any } = {};
  Object.keys(tables).forEach(key => (dbObj[key] = {}));

  arrayData.forEach(row => {
    const seasonName = metricReference[row[0]][0];
    const columnName = metricReference[row[0]][1];
    dbObj[seasonName][columnName] = row.slice(1);
    dbObj[seasonName].gaugeId = id;
  });

  return { dbObj, gaugeId: <number>id };
};

/**
 * Upload to database and generate report
 */

const uploadDB = async (dbObjects: any, tables: ITables) => {
  const promises = Object.keys(tables).map(key =>
    tables[key].bulkCreate(dbObjects[key])
  );
  return Promise.all<{ gaugeId: number }[]>(promises).then(d => {
    const report = {} as IReport;
    Object.keys(tables).forEach(
      (tbl: string, idx: number) =>
        (report[tbl] = {
          gauges: d[idx].map(i => i.gaugeId),
          count: d[idx].length,
        })
    );
    return report;
  });
};
