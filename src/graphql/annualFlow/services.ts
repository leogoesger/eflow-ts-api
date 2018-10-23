import { AnnualFlow } from '../../db/models';

export interface IValidatePayload {
  gaugeNum: number;
  yearNum: number;
}

export class annualFlowServices {
  AnnualFlow = AnnualFlow;

  public getAnnualFlow(id: number) {
    return this.AnnualFlow.find({
      where: { gaugeId: id },
    });
  }

  public async validate(d: IValidatePayload): Promise<Boolean> {
    const annualFlows = await AnnualFlow.findAll();
    const nonValid = annualFlows.some(item => {
      return item.flowData.length !== d.yearNum;
    });
    return annualFlows.length === d.gaugeNum && !nonValid;
  }
}
