import { categoryServices } from './services';

const service = new categoryServices();

export const categoryQueries = {
    getCategories: () => service.getCategories(),
};
