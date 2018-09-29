import { productServices } from './services';
import { IProduct } from '../../models';

const service = new productServices();

export const productMutations = {
  createProduct: (_: any, { productPayload }: { productPayload: IProduct }) => {
    return service.createProduct(productPayload);
  },
};
