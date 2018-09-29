import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

export interface IProduct {
  id?: Int32Array; // id is an auto-generated UUID
  name: string;
  price: number;
  archived?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

type ProductInstance = Sequelize.Instance<IProduct> & IProduct;

type ProductModel = Sequelize.Model<ProductInstance, IProduct>;

const productFactory = (sequalize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<IProduct> = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    archived: {
      allowNull: false,
      defaultValue: false,
      type: Sequelize.BOOLEAN,
    },
    price: { type: Sequelize.DECIMAL(10, 2), allowNull: false },
    name: { type: Sequelize.STRING, allowNull: false },
  };
  const Product = sequalize.define<ProductInstance, IProduct>(
    'Product',
    attributes
  );
  Product.associate = models => {
    Product.hasMany(models.Category, {
      foreignKey: 'productId',
      as: 'categories',
    });
  };
  return Product;
};

export { ProductModel, productFactory };
