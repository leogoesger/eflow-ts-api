import * as csv from 'csvtojson';
import axios from 'axios';
import { Request, Response } from 'express';
import { from, Observable, forkJoin, of } from 'rxjs';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';

import { AnnualFlow } from '../../db/models';
import { gauges } from '../../static/allGauges';

export const uploadAnnualFlow = async (_: Request, res: Response) => {
  await AnnualFlow.destroy({ where: {} });
  const arraySrc$ = from(gauges).pipe(
    mergeMap(gauge => readCSVFile(gauge.id)),
    mergeMap(({ data, gaugeId }: any) => readStringToArray(data, gaugeId)),
    map(({ data, gaugeId }) => transposeArray(data, gaugeId)),
    mergeMap(({ data, gaugeId }) => forkJoin(uploadToDB(data, gaugeId))),
    catchError(error => of(`Bad Promise: ${error}`))
  );
  arraySrc$.subscribe(
    (item: any) => {
      console.log(item);
    },
    (error: any) => {
      res.status(400).send(error);
    },
    () => res.status(200).send()
  );
};

const readCSVFile = (gaugeId: number) => {
  const csvFilePath = `${
    process.env.S3_BUCKET
  }/annual_flow_matrix/${gaugeId}.csv`;
  return Observable.create((observer: any) =>
    axios
      .get(csvFilePath)
      .then(({ data }) => {
        observer.next({ data, gaugeId });
        observer.complete();
      })
      .catch(err => {
        observer.error(err);
        observer.complete();
      })
  );
};

const readStringToArray = (csvStr: string, gaugeId: number) => {
  return Observable.create((observer: any) =>
    csv({
      noheader: true,
      output: 'csv',
    })
      .fromString(csvStr)
      .then((data: any) => {
        observer.next({ data, gaugeId });
        observer.complete();
      })
  );
};

const transposeArray = (array: string[][], gaugeId: number) => {
  return {
    data: array[0].map((_, i) =>
      array.map(row => (isNaN(Number(row[i])) ? null : Number(row[i])))
    ),
    gaugeId,
  };
};

export const uploadToDB = (array: number[][], gaugeId: number) => {
  const result = array.map(ary => ({
    year: ary[0],
    flowData: ary.slice(1),
    gaugeId,
  }));

  return Observable.create((observer: any) => {
    AnnualFlow.bulkCreate(result)
      .then(() => {
        observer.next(gaugeId);
        observer.complete();
      })
      .catch(err => {
        observer.error(err);
        observer.complete();
      });
  });
};
