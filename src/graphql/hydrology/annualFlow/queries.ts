import { AnnualFlowServices, IValidatePayload } from './services';

const service = new AnnualFlowServices();

export const annualFlowQueries = {
  getAnnualFlow: (_: any, { id }: { id: number }) => service.getAnnualFlow(id),
  validateAnnualFlow: (
    _: any,
    { validatePL }: { validatePL: IValidatePayload }
  ) => service.validate(validatePL),
};
