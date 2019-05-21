import { AllYearServices, IValidatePayload } from "./services";
import { IGaugeInfo } from "../gauge/models";

const service = new AllYearServices();

export const allYearQueries = {
  getAllYear: (_: any, { gaugeInfo }: { gaugeInfo: IGaugeInfo }) =>
    service.getAllYear(gaugeInfo.gaugeId),
  validateAllYear: (_: any, { validatePL }: { validatePL: IValidatePayload }) =>
    service.validate(validatePL)
};
