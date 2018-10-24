import * as csv from 'csvtojson';
import axios from 'axios';
import { Request, Response } from 'express';
import { from, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { AnnualFlow } from '../../db/models';
import { gauges } from '../../static/allGauges';

export const uploadAnnualFlow = async (_: Request, res: Response) => {
  let i = 0;
  await AnnualFlow.destroy({ where: {} });
  const arraySrc$ = from(gauges).pipe(
    mergeMap(gauge => readCSVFile(gauge.id)),
    mergeMap((csvStr: any) => readStringToArray(csvStr.data)),
    map((array: string[][]) => transposeArray(array)),
    mergeMap((array: number[][]) => uploadToDB(array, 10255800)),
    mergeMap(item => uploadedItems(item))
  );
  arraySrc$.subscribe(
    (item: any) => {
      i += 1;
      console.log(i);
    },
    (error: any) => {
      res.status(400).send(error);
    },
    () => res.status(200)
  );
};

const readCSVFile = (gaugeId: number) => {
  const csvFilePath = `${
    process.env.S3_BUCKET
  }/annual_flow_matrix/${gaugeId}.csv`;
  return Observable.create((observer: any) =>
    axios
      .get(csvFilePath)
      .then(d => {
        observer.next(d);
        observer.complete();
      })
      .catch(err => {
        observer.error(err);
        observer.complete();
      })
  );
};

const readStringToArray = (csvStr: string) => {
  return Observable.create((observer: any) =>
    csv({
      noheader: true,
      output: 'csv',
    })
      .fromString(csvStr)
      .then((csvRow: any) => {
        observer.next(csvRow);
        observer.complete();
      })
  );
};

const transposeArray = (array: string[][]) =>
  array[0].map((_, i) =>
    array.map(row => (isNaN(Number(row[i])) ? null : Number(row[i])))
  );

export const uploadToDB = (array: number[][], gaugeId: number) => {
  const result = array.map(ary => ({
    year: ary[0],
    flowData: ary.slice(1),
    gaugeId,
  }));

  return Observable.create((observer: any) => {
    AnnualFlow.bulkCreate(result)
      .then(d => {
        observer.next(d);
        observer.complete();
      })
      .catch(err => {
        observer.error(err);
        observer.complete();
      });
  });
};

const uploadedItems = (item: any) => {
  return item;
};
