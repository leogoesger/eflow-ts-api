import { IGaugeInfo, IPagePL, AnnualFlow, Condition, Year } from "./models";
import { ConditionServices } from "../condition";

export interface IValidatePayload {
  gaugeId: number;
  year: number;
}

export class AnnualFlowServices {
  AnnualFlow = AnnualFlow;

  public async getAnnualFlow(gaugeInfo: IGaugeInfo) {
    const services = new ConditionServices();

    const data = await services.getCondition(gaugeInfo);

    const { gaugeId, year } = gaugeInfo;
    const result = await AnnualFlow.findOne({ where: { gaugeId, year } });
    result.condition = data.conditions[0];

    return result;
  }

  public async validate(d: IValidatePayload): Promise<boolean> {
    const annualFlows = await AnnualFlow.findAll();
    const nonValid = annualFlows.some(item => {
      return item.flowData.length !== d.year;
    });
    return annualFlows.length === d.gaugeId && !nonValid;
  }
}
