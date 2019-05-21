import { SpringServices } from "./services";
import { IGaugeInfo } from "../../models";

const service = new SpringServices();

export interface IGauge {
  gaugeInfo: IGaugeInfo;
}

export const springQueries = {
  getSpring: (_: any, { gaugeInfo }: IGauge) => service.getSpring(gaugeInfo)
};
