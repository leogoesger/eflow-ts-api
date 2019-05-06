import { MemberServices } from './services';

const service = new MemberServices();

export const memberQueries = {
  getMembers: () => service.getMembers(),
  getMember: (_: any, { id }: { id: number }) => service.getMember(id),
};
