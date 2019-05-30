import { IGaugeInfo } from "../../models";
import { ConditionServices } from "./services";

const service = new ConditionServices();

export const conditionQueries = {
  getCondition: (_: any, { gaugeInfo }: { gaugeInfo: IGaugeInfo }) =>
    service.getCondition(gaugeInfo),
  getConditions: (_: any, { gaugeInfo }: { gaugeInfo: IGaugeInfo }) =>
    service.getConditions(gaugeInfo)
};
