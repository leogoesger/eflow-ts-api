import axios from 'axios';
import {
  TsUpload,
  UploadTimeSeriesPL,
  RequestWithUser,
  TSCalcResponse,
} from './models';

export class tsUploadServices {
  TsUpload = TsUpload;
  flaskServerUrl = process.env.EFLOW_FLASK_URL;

  _isInvalidInput(pl: UploadTimeSeriesPL) {
    const { dates, flows, label, startDate } = pl;
    return (
      !dates || !flows || !startDate || dates.length !== flows.length || !label
    );
  }

  public async uploadTimeSeries(pl: UploadTimeSeriesPL, req: RequestWithUser) {
    if (this._isInvalidInput(pl)) {
      throw 'dates, flows and startDate must be provided';
    }
    try {
      const axiosRes = await axios.post(`${this.flaskServerUrl}/api`, {
        ...pl,
        start_date: pl.startDate,
      });
      const tsCal: TSCalcResponse = JSON.parse(axiosRes.data);

      return this.TsUpload.create({
        ...pl,
        succeed: true,
        userId: req.user.id,
        flowMatrix: tsCal.flow_matrix,
        DRH: tsCal.DRH,
        allYear: tsCal.all_year,
        winter: tsCal.winter,
        fall: tsCal.fall,
        summer: tsCal.summer,
        spring: tsCal.spring,
        fallWinter: tsCal.fall_winter,
        yearRanges: tsCal.year_ranges,
      });
    } catch {
      this.TsUpload.create({
        ...pl,
        succeed: false,
        userId: req.user.id,
      }).catch(e => {
        throw `Database Error ${e.toString()}`;
      });

      throw 'Data could not be processed';
    }
  }
}
