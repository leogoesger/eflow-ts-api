import { tsUploadServices } from './services';
import { UploadTimeSeriesPL, IContext } from './models';

const service = new tsUploadServices();

export const tsUploadMutations = {
  /**
   * Upload CSV time series data to process with FFC Flask Server
   *
   * @param uploadTimeSeriesPL It can be a string with value `USER`, `ADMIN` or `SUPER_ADMIN`
   * @param req Express' `Request` with user attached to it
   *
   * @returns services to make the api call and make db update
   */
  uploadTimeSeries: (
    _: any,
    { uploadTimeSeriesPL }: { uploadTimeSeriesPL: UploadTimeSeriesPL },
    { req }: IContext
  ) => {
    return service.uploadTimeSeries(uploadTimeSeriesPL, req);
  },
};
