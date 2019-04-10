import { Request, Response } from "express";
import { calculatePercentileClourse } from "../../utils/calculatePercentiles";

export const updateClassMetricData = async (req: Request, res: Response) => {
  try {
    await calculatePercentileClourse(req, res);
  } catch (e) {
    res.status(400).send(e.toString());
  }
};
