import { MemberServices } from './services';
import { IMember } from '../../db/models';

const service = new MemberServices();

export const memberMutations = {
  updateMember: (_: any, { updateMemberPL }: { updateMemberPL: IMember }) =>
    service.updateMember(updateMemberPL),
  createMember: (_: any, { createMemberPL }: { createMemberPL: IMember }) =>
    service.createMember(createMemberPL),
  deleteMember: (_: any, { id }: { id: number }) => service.deleteMember(id),
};
