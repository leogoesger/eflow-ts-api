import { memberPaperServices } from './services';
import { IMemberPaper } from '../../db/models';

const service = new memberPaperServices();

export const memberPaperMutations = {
  updateMemberPaper: (
    _: any,
    { updateMemberPaperPL }: { updateMemberPaperPL: IMemberPaper }
  ) => service.updateMemberPaper(updateMemberPaperPL),
  createMemberPaper: (
    _: any,
    { createMemberPaperPL }: { createMemberPaperPL: IMemberPaper }
  ) => service.createMemberPaper(createMemberPaperPL),
  deleteMemberPaper: (_: any, { id }: { id: number }) =>
    service.deleteMemberPaper(id),
};
