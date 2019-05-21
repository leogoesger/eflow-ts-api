import { Request, Response } from "express";

export interface RequestWithUser extends Request {
  user: any;
}
export interface IContext {
  req: RequestWithUser;
  res: Response;
}

export interface IPagePL {
  offset: number;
  limit: number;
}

export interface IGaugeInfo {
  gaugeId: number;
  year: number;
}

export interface IHydroInfo {
  id: number;
  type: "CLASS" | "GAUGE";
}
