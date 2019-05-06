import { AnnualFlow } from '../../../db/models';

export interface IValidatePayload {
  gaugeNum: number;
  yearNum: number;
}

export class AnnualFlowServices {
  AnnualFlow = AnnualFlow;

  public getAnnualFlow(id: number) {
    return this.AnnualFlow.findOne({
      where: { gaugeId: id },
    });
  }

  public async validate(d: IValidatePayload): Promise<boolean> {
    const annualFlows = await AnnualFlow.findAll();
    const nonValid = annualFlows.some(item => {
      return item.flowData.length !== d.yearNum;
    });
    return annualFlows.length === d.gaugeNum && !nonValid;
  }
}
