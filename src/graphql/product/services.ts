import { Product } from '../../models';

export class productServices {
    Product = Product;

    public getProducts() {
        return this.Product.findAll();
    }
}
