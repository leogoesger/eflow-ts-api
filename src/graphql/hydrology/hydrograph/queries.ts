import { HydrographServices } from "./services";
import { IHydroInfo } from "../../models";

const service = new HydrographServices();

export interface IHydro {
  hydroInfo: IHydroInfo;
}

export const hydrographQueries = {
  getHydrograph: (_: any, { hydroInfo }: IHydro) =>
    service.getHydrograph(hydroInfo)
};
