import { PaperServices } from './services';
import { IPaper } from '../../db/models';

const service = new PaperServices();

export const paperMutations = {
  updatePaper: (_: any, { updatePaperPL }: { updatePaperPL: IPaper }) =>
    service.updatePaper(updatePaperPL),
  createPaper: (_: any, { createPaperPL }: { createPaperPL: IPaper }) =>
    service.createPaper(createPaperPL),
  deletePaper: (_: any, { id }: { id: number }) => service.deletePaper(id),
};
