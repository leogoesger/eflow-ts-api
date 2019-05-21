import { AnnualFlowServices, IValidatePayload } from "./services";
import { IGaugeInfo } from "./models";

const service = new AnnualFlowServices();
interface IData {
  gaugeInfo: IGaugeInfo;
}
export const annualFlowQueries = {
  getAnnualFlow: (_: any, { gaugeInfo }: IData) =>
    service.getAnnualFlow(gaugeInfo),
  validateAnnualFlow: (
    _: any,
    { validatePL }: { validatePL: IValidatePayload }
  ) => service.validate(validatePL)
};
