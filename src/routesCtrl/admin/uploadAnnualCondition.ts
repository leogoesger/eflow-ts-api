import { Request, Response } from 'express';
import { from, of } from 'rxjs';
import { map, mergeMap, concatMap, catchError, delay } from 'rxjs/operators';

import { Condition, ICondition } from '../../db/models';
import { gauges } from '../../static';
import {
  readCSVFile,
  readStringToArrays,
  transposeArray,
  IReadStringToArrayPL,
  ITransposeArrayPL,
  IArrayPL,
} from './helpers';

interface IObj {
  [index: string]: any;
}
interface IReport {
  data: IObj;
  meta: { gaugeCount: number; rowCount: number };
}

interface ISub {
  annualFlowArray: IAnnualFlow[];
  gaugeId: number;
}

/**
 * Load csv for Annual Flow Matrix from AWS via rxjs 
 *   
 * Four pipeing functions:
 *   1. read csv from aws for each gauge which consists of many years of flow data
     2. read string to array with csvtojson
     3. transpose the array, so each array inside starts with year, and then continue with flow data
     4. catch error
 * 
 * Subscribe takes three functions:
 *   1. onNext(): convert transposed array to array of objects for each gauge, and store that in `result`. `report`
     is just an object keeping track of all the meta data
     2. onError(): error handler
     3. onComplete: sequelize bulkCreate with result array of AnnualFlows
 */

export const uploadCondition = async (_: Request, res: Response) => {
  await Condition.destroy({ where: {} });
  const report: IReport = {
    data: {},
    meta: { gaugeCount: 0, rowCount: 0 },
  };
  let result: ICondition[] = [];

  const src$ = from(gauges).pipe(
    concatMap(x => of(x).pipe(delay(300))),
    mergeMap(gauge => readCSVFile(gauge.id, 'annual_flow_matrix')),
    mergeMap((d: IReadStringToArrayPL) => readStringToArrays(d)),
    map((d: ITransposeArrayPL) => transposeArray(d)),
    map((d: IArrayPL) => createConditionArray(d)),
    catchError(error => of(`Bad Promise: ${error}`))
  );
  src$.subscribe(
    ({ ConditionArray, gaugeId }: ISub) => {
      report.data[gaugeId] = ConditionArray.length;
      report.meta.gaugeCount += 1;
      report.meta.rowCount += ConditionArray.length;
      result = result.concat(ConditionArray);

      console.log(report.meta);
    },
    (error: any) => res.status(400).send(error),
    () => Condition.bulkCreate(result).then(d => res.status(200).send(report))
  );
};

const createConditionArray = ({ arrayData, id }: IArrayPL): ISub => {
  const ConditionArray: ICondition[] = arrayData.map((ary: number[]) => ({
    year: ary[0],
    flowData: ary.slice(1),
    gaugeId: <number>id,
  }));

  return { ConditionArray, gaugeId: <number>id };
};


/*
async uploadAnnualCondition(req, res) {
    const url = `${process.env.S3_BUCKET}annual_conditions/`;
    const promises = [];
    await Condition.destroy({where: {}});

    const files = gaugeReference.map(d => `${url}${d.id}.csv`);

    files.forEach(file => {
      const annual_conditions = {
        gaugeId: file.split('/')[5].split('.')[0],
        conditions: [],
      };

      csv({
        noheader: false,
      })
        .fromStream(request.get(file))
        .on('csv', csvRow => {
          if (csvRow[1] === 'nan') {
            annual_conditions.conditions.push('NOT AVAILABLE');
          } else {
            annual_conditions.conditions.push(csvRow[1].toUpperCase());
          }
        })
        .on('done', () => {
          promises.push(Condition.create(annual_conditions));
        });
    });

    Promise.all(promises)
      .then(() => res.status(200).send({message: 'success'}))
      .catch(e => res.status(404).send({message: e.toString()}));
  },




*/
