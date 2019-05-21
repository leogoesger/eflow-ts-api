import {
  IGaugeInfo,
  IPagePL,
  AllYear,
  AnnualFlow,
  Spring,
  Summer,
  Fall,
  FallWinter,
  Winter,
  Condition,
  Gauge,
  Year
} from "./models";
import { metricReferenceAs } from "../../../static/metricReference";

const models = {
  Falls: Fall,
  FallWinters: FallWinter,
  Springs: Spring,
  Summers: Summer,
  Winters: Winter,
  AllYears: AllYear
};

export interface IValidatePayload {
  gaugeId: number;
  year: number;
}

export class AnnualFlowServices {
  AnnualFlow = AnnualFlow;

  public async getAnnualFlow(gaugeInfo: IGaugeInfo) {
    const { gaugeId, year } = gaugeInfo;
    return AnnualFlow.findOne({ where: { gaugeId, year } });
  }

  public async validate(d: IValidatePayload): Promise<boolean> {
    const annualFlows = await AnnualFlow.findAll();
    const nonValid = annualFlows.some(item => {
      return item.flowData.length !== d.year;
    });
    return annualFlows.length === d.gaugeId && !nonValid;
  }
}
