import { Product, IProduct } from '../../models';

export class productServices {
  Product = Product;

  public getProducts() {
    return this.Product.findAll();
  }

  public createProduct({ name, price, archived }: IProduct) {
    return this.Product.create({ name, price, archived });
  }
}
