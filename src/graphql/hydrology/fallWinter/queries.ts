import { IGaugeInfo } from "../../models";
import { FallWinterServices } from "./services";

const service = new FallWinterServices();

export interface IGauge {
  gaugeInfo: IGaugeInfo;
}

export const fallWinterQueries = {
  getFallWinter: (_: any, { gaugeInfo }: IGauge) =>
    service.getFallWinter(gaugeInfo)
};
