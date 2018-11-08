import { paperServices } from './services';

const service = new paperServices();

export const paperQueries = {
  getPapers: () => service.getPapers(),
  getPaper: (_: any, { id }: { id: number }) => service.getPaper(id),
};
