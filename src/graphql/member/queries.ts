import { memberServices } from './services';

const service = new memberServices();

export const memberQueries = {
  getMembers: () => service.getMembers(),
  getMember: (_: any, { id }: { id: number }) => service.getMember(id),
};
