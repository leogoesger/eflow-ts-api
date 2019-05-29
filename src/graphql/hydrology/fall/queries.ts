import { FallServices } from "./services";
import { IGaugeInfo } from "../../models";

const service = new FallServices();

export interface IGauge {
  gaugeInfo: IGaugeInfo;
}

export const fallQueries = {
  getFall: (_: any, { gaugeInfo }: IGauge) => service.getFall(gaugeInfo)
};
