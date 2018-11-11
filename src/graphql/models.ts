import { Request, Response } from 'express';

export interface RequestWithUser extends Request {
  user: {
    id: number;
    name: string;
  };
}
export interface IContext {
  req: RequestWithUser;
  res: Response;
}

export interface IPagePL {
  offset: number;
  limit: number;
}
