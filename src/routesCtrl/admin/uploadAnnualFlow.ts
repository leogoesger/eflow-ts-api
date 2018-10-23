import * as csv from 'csvtojson';
import { get } from 'request';
import { Request, Response } from 'express';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

import { AnnualFlow } from '../../db/models';
import { gauges } from '../../static/allGauges';
import { Observable } from 'apollo-link';

export const inputFlowToDatabase = async (result: any, file: number) => {
  Object.keys(result).forEach(key => {
    AnnualFlow.create({
      year: Number(key),
      flowData: result[key],
      gaugeId: file,
    });
  });
};

export const uploadAnnualFlow = (req: Request, res: Response) => {
  const arraySrc$ = from(gauges);
  arraySrc$.subscribe(
    x => readIntoCSV(x.id),
    err => res.status(400).send({ msg: 'Something went awful' }),
    () => res.status(201).send({ msg: 'Did it!' })
  );
};

const readIntoCSV = (gaugeId: number) => {
  const csvFilePath = `${
    process.env.S3_BUCKET
  }annual_flow_matrix/${gaugeId}.csv`;

  let firstRow = true;
  const result = {} as any;
  const mapping = {} as any;

  return csv({ noheader: true })
    .fromStream(get(csvFilePath) as any)
    .on('csv', (csvRow: any) => {
      if (firstRow) {
        csvRow.forEach((ele: string, index: number) => {
          result[Number(ele)] = [];
          mapping[index] = Number(ele);
          firstRow = false;
        });
      } else {
        csvRow.forEach((ele: string, index: number) => {
          result[mapping[index]].push(ele);
        });
      }
    })
    .on('done', () => {
      console.log(result);
      inputFlowToDatabase(result, gaugeId);
    });
};
