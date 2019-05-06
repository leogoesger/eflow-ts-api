import { Request, Response } from 'express';
import { from, of } from 'rxjs';
import { catchError, concatMap, delay, map, mergeMap } from 'rxjs/operators';
import { Condition, ICondition } from '../../db/models';
import { gauges } from '../../static';
import {
  IReadStringToArrayPL,
  ITransposeArrayPL,
  readCSVFile,
  readStringToArrays,
} from './helpers';

interface IReport {
  meta: { gaugeCount: number; rowCount: number };
}

/**
 * Load csv for Annual Conditions from AWS
 */

export const uploadCondition = async (_: Request, res: Response) => {
  await Condition.destroy({ where: {} });
  const report: IReport = {
    meta: { gaugeCount: 0, rowCount: 0 },
  };

  await Condition.destroy({ where: {} });

  const result: ICondition[] = [];

  const src$ = from(gauges).pipe(
    concatMap(x => of(x).pipe(delay(300))),
    mergeMap(gauge => readCSVFile(gauge.id, 'annual_conditions')),
    mergeMap((d: IReadStringToArrayPL) => readStringToArrays(d, false)),
    map((d: ITransposeArrayPL) => createAnnualConditionArray(d)),
    catchError(error => of(`Bad Promise: ${error}`))
  );

  src$.subscribe(
    ({ conditions, gaugeId }: ICondition) => {
      report.meta.gaugeCount += 1;
      report.meta.rowCount += 1;
      result.push({ conditions, gaugeId });
    },
    (error: any) => res.status(400).send(error),
    () => Condition.bulkCreate(result).then(__ => res.status(200).send(report))
  );
};

const createAnnualConditionArray = ({
  arrayData,
  id,
}: ITransposeArrayPL): ICondition => {
  const conditions: string[] = [];
  arrayData.forEach((csvRow: string[]) => {
    if (csvRow[1] === 'nan') {
      conditions.push('NOT AVAILABLE');
    } else {
      conditions.push(csvRow[1].toUpperCase());
    }
  });

  return { conditions, gaugeId: <number>id };
};
