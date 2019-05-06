import { PaperServices } from './services';

const service = new PaperServices();

export const paperQueries = {
  getPapers: () => service.getPapers(),
  getPaper: (_: any, { id }: { id: number }) => service.getPaper(id),
};
