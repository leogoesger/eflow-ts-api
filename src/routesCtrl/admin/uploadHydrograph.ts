import { Request, Response } from 'express';
import { from, of } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';

import { Hydrograph, IHydrograph } from '../../db/models';
import { Percentilles } from '../../db/models/Hydrograph';
import { gauges } from '../../static';
import {
  readCSVFile,
  readStringToArrays,
  IReadStringToArrayPL,
  ITransposeArrayPL,
} from './helpers';

const dbObjs: IHydrograph[] = [];
const NUM_CLASSES = 9;

export const uploadClassHydrograph = async (_: Request, res: Response) => {
  await Hydrograph.destroy({ where: { type: 'CLASS' } });

  const classes = [...Array(NUM_CLASSES)].map((_, i) => `Class_${i + 1}`);
  const src$ = from(classes).pipe(
    mergeMap(cls => readCSVFile(cls, 'DRH_Class', '_aggregate')),
    mergeMap((d: IReadStringToArrayPL) => readStringToArrays(d)),
    catchError(error => of(`Bad Promise: ${error}`))
  );

  src$.subscribe(
    updateObj,
    (error: any) => res.status(400).send(error),
    () => uploadDB(res)
  );
};

export const uploadGaugeHydrograph = async (_: Request, res: Response) => {
  await Hydrograph.destroy({ where: { type: 'GAUGE' } });

  const src$ = from(gauges).pipe(
    map((gauge: any) => `plot_data_${gauge.id}`),
    mergeMap(gauge => readCSVFile(gauge, 'DRH_Gauge')),
    mergeMap((d: IReadStringToArrayPL) => readStringToArrays(d)),
    catchError(error => of(`Bad Promise: ${error}`))
  );

  // const src2$ = from(gauges).pipe(
  //   map((gauge: any) => of(`plot_data_${gauge.id}`).pipe()),
  // );

  src$.subscribe(
    updateObj,
    (error: any) => res.status(400).send(error),
    () => uploadDB(res)
  );
};

const updateObj = ({ arrayData, id }: ITransposeArrayPL) => {
  dbObjs.push(
    ...arrayData.map((ary, i) => ({
      data: ary.map(d => Number(d)),
      classId: id.toString().includes('Class')
        ? Number(id.toString().split('_')[1])
        : null,
      gaugeId: id.toString().includes('Class')
        ? null
        : Number(id.toString().split('_')[2]),
      percentille: Percentilles[i],
      type: 'CLASS',
    }))
  );

  console.log(id);
};

const uploadDB = (res: Response) => {
  Hydrograph.bulkCreate(dbObjs).then(() =>
    res.status(200).send({ msg: `${dbObjs.length} records uploaded.` })
  );
};
