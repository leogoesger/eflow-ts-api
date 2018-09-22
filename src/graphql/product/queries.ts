import { productServices } from './services';

const service = new productServices();

export const productQueries = {
    getProducts: () => service.getProducts(),
};
