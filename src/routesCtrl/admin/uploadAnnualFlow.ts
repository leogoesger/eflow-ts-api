import * as csv from 'csvtojson';
import axios from 'axios';
import { Request, Response } from 'express';
import { from, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import { AnnualFlow } from '../../db/models';
import { gauges } from '../../static/allGauges';

export const uploadAnnualFlow = async (_: Request, res: Response) => {
  await AnnualFlow.destroy({ where: {} });
  const totalItems = {} as { [index: string]: number };

  const arraySrc$ = from(gauges).pipe(
    mergeMap(gauge => readCSVFile(gauge.id)),
    mergeMap(({ data, gaugeId }: any) => readStringToArray(data, gaugeId)),
    map(({ data, gaugeId }) => transposeArray(data, gaugeId)),
    mergeMap(({ data, gaugeId }) => uploadToDB(data, gaugeId)),
    catchError(error => of(`Bad Promise: ${error}`))
  );
  arraySrc$.subscribe(
    (d: { data: number; gaugeId: number }) => {
      console.log(d.gaugeId);
      totalItems[d.gaugeId] = d.data;
    },
    (error: any) => {
      res.status(400).send(error);
    },
    () =>
      res.status(200).send({
        data: totalItems,
        meta: {
          gaugeCount: Object.keys(totalItems).length,
          totalRowCount: Object.values(totalItems).reduce((a, b) => a + b, 0),
        },
      })
  );
};

const readCSVFile = async (gaugeId: number) => {
  const csvFilePath = `${
    process.env.S3_BUCKET
  }/annual_flow_matrix/${gaugeId}.csv`;
  try {
    const { data } = await axios.get(csvFilePath);
    return { data, gaugeId };
  } catch (error) {
    throw error;
  }
};

const readStringToArray = async (csvStr: string, gaugeId: number) => {
  try {
    const data = await csv({
      noheader: true,
      output: 'csv',
    }).fromString(csvStr);

    return { data, gaugeId };
  } catch (error) {
    throw error;
  }
};

const transposeArray = (array: string[][], gaugeId: number) => {
  return {
    data: array[0].map((_, i) =>
      array.map(row => (isNaN(Number(row[i])) ? null : Number(row[i])))
    ),
    gaugeId,
  };
};

export const uploadToDB = async (array: number[][], gaugeId: number) => {
  const result = array.map(ary => ({
    year: ary[0],
    flowData: ary.slice(1),
    gaugeId,
  }));

  try {
    const data = await AnnualFlow.bulkCreate(result);
    return { data: data.length, gaugeId };
  } catch (error) {
    throw error;
  }
};
