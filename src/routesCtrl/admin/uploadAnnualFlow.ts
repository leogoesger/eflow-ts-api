import * as csv from 'csvtojson';
import axios from 'axios';
import { Request, Response } from 'express';
import { from, of } from 'rxjs';
import { map, mergeMap, concatMap, catchError, delay } from 'rxjs/operators';

import { AnnualFlow, IAnnualFlow } from '../../db/models';
import { gauges } from '../../static/allGauges';

interface IObj {
  [index: string]: any;
}
interface IReport {
  data: IObj;
  meta: { gaugeCount: number; rowCount: number };
}

interface IReadStringToArrayPL {
  stringData: string;
  gaugeId: number;
}

interface ITransposeArrayPL {
  arrayData: string[][];
  gaugeId: number;
}

interface IAnnualFlowArrayPL {
  arrayData: number[][];
  gaugeId: number;
}

interface ISub {
  annualFlowArray: IAnnualFlow[];
  gaugeId: number;
}

/**
 * Load csv for Annual Flow Matrix from AWS via rxjs 
 *   
 * Four piping functions:
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

export const uploadAnnualFlow = async (_: Request, res: Response) => {
  await AnnualFlow.destroy({ where: {} });
  const report: IReport = {
    data: {},
    meta: { gaugeCount: 0, rowCount: 0 },
  };
  let result: IAnnualFlow[] = [];

  const src$ = from(gauges).pipe(
    concatMap(x => of(x).pipe(delay(300))),
    mergeMap(gauge => readCSVFile(gauge.id)),
    mergeMap((d: IReadStringToArrayPL) => readStringToArrays(d)),
    map((d: ITransposeArrayPL) => transposeArray(d)),
    map((d: IAnnualFlowArrayPL) => createAnnualFlowArray(d)),
    catchError(error => of(`Bad Promise: ${error}`))
  );
  src$.subscribe(
    ({ annualFlowArray, gaugeId }: ISub) => {
      report.data[gaugeId] = annualFlowArray.length;
      report.meta.gaugeCount += 1;
      report.meta.rowCount += annualFlowArray.length;
      result = result.concat(annualFlowArray);
      console.log(report.meta);
    },
    (error: any) => res.status(400).send(error),
    () => AnnualFlow.bulkCreate(result).then(d => res.status(200).send(report))
  );
};

const readCSVFile = async (gaugeId: number): Promise<IReadStringToArrayPL> => {
  const { data } = await axios.get(
    `${process.env.S3_BUCKET}/annual_flow_matrix/${gaugeId}.csv`
  );
  return { stringData: data, gaugeId };
};

const readStringToArrays = async ({
  stringData,
  gaugeId,
}: IReadStringToArrayPL): Promise<ITransposeArrayPL> => {
  const arrayData = await csv({
    noheader: true,
    output: 'csv',
  }).fromString(stringData);

  return { arrayData, gaugeId };
};

const transposeArray = ({
  arrayData,
  gaugeId,
}: ITransposeArrayPL): IAnnualFlowArrayPL => {
  return {
    arrayData: arrayData[0].map((_, i) =>
      arrayData.map(row => (isNaN(Number(row[i])) ? null : Number(row[i])))
    ),
    gaugeId,
  };
};

const createAnnualFlowArray = ({
  arrayData,
  gaugeId,
}: IAnnualFlowArrayPL): ISub => {
  const annualFlowArray: IAnnualFlow[] = arrayData.map((ary: number[]) => ({
    year: ary[0],
    flowData: ary.slice(1),
    gaugeId,
  }));

  return { annualFlowArray, gaugeId };
};
