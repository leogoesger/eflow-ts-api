import { FallWinterServices } from "./services";
import { IGaugeInfo } from "../../models";

const service = new FallWinterServices();

export interface IGauge {
  gaugeInfo: IGaugeInfo;
}

export const fallWinterQueries = {
  getFallWinter: (_: any, { gaugeInfo }: IGauge) =>
    service.getFallWinter(gaugeInfo)
};
