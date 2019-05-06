import { AllYearServices, IValidatePayload } from './services';

const service = new AllYearServices();

export const allYearQueries = {
  getAllYear: (_: any, { id }: { id: number }) => service.getAllYear(id),
  validateAllYear: (_: any, { validatePL }: { validatePL: IValidatePayload }) =>
    service.validate(validatePL),
};
