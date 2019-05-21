import { GaugeServices } from "./services";
import { IPagePL, IGaugeInfo } from "../../models";

const service = new GaugeServices();

export const gaugeQueries = {
  getGauges: (_: any, { pagePL }: { pagePL: IPagePL }) =>
    service.getGauges(pagePL),
  getGauge: (_: any, { gaugeInfo }: { gaugeInfo: IGaugeInfo }) =>
    service.getGauge(gaugeInfo)
};
