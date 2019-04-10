import { Request, Response } from "express";
import { updateGaugePercentiles } from "../../utils/calculatePercentiles";

export const updateGaugeMetricData = (req: Request, res: Response) => {
  try {
    updateGaugePercentiles(req, res);
  } catch (error) {
    res.status(400).send(`Error updating gauges for class ${req.params.id}`);
  }
};
