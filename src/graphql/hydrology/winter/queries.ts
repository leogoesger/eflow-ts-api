import { IGaugeInfo } from "../../models";
import { WinterServices } from "./services";

const service = new WinterServices();

export interface IGauge {
  gaugeInfo: IGaugeInfo;
}

export const winterQueries = {
  getWinter: (_: any, { gaugeInfo }: IGauge) => service.getWinter(gaugeInfo)
};
