import { SummerServices } from "./services";
import { IGaugeInfo } from "../../models";

const service = new SummerServices();

export interface IGauge {
  gaugeInfo: IGaugeInfo;
}

export const summerQueries = {
  getSummer: (_: any, { gaugeInfo }: IGauge) => service.getSummer(gaugeInfo)
};
