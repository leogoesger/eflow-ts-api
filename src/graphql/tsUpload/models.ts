import { TsUpload } from '../../db/models';
import { RequestWithUser, IContext } from '../models';

interface UploadTimeSeriesPL {
  dates: string[];
  flows: number[];
  startDate: string;
  name: string;
  params?: object;
}

interface TSCalcResponse {
  flow_matrix: any;
  start_date: any;
  DRH: any;
  all_year: any;
  winter: any;
  fall: any;
  summer: any;
  spring: any;
  fall_winter: any;
  year_ranges: any;
}
export {
  TsUpload,
  UploadTimeSeriesPL,
  TSCalcResponse,
  RequestWithUser,
  IContext,
};
