import { Request, Response } from 'express';
import { AnnualFlow, IAnnualFlow } from '../../db/models';

export const uploadMetricResult = (req: Request, res: Response) => {
  AnnualFlow.create({
    gaugeId: 10255800,
    flowData: [1.2, 2.2, 3.3],
    year: 1234,
  })
    .then(d => res.status(200).send(d))
    .catch(err => res.status(400).send(err.toString()));
};
