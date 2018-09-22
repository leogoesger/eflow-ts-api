// src/db/models/index.js

import * as Sequelize from 'sequelize';
import { productFactory, ProductModel } from './Product';
import { categoryFactory, CategoryModel } from './Category';
import { config } from '../config/config';

const env = process.env.NODE_ENV || 'development';
const configEnv = config[env] as any;

const sequelize = new Sequelize(
    configEnv.database,
    configEnv.username,
    config.password,
    configEnv
);

export interface IDB {
    Product: ProductModel;
    Category: CategoryModel;
    Sequelize: Sequelize.SequelizeStatic;
    sequelize: Sequelize.Sequelize;
}

const db: IDB = {
    Product: productFactory(sequelize),
    Category: categoryFactory(sequelize),
    Sequelize,
    sequelize,
};

(<any>Object).values(db).forEach((model: any) => {
    if (model.associate) {
        model.associate(db);
    }
});

const { Product, Category } = db;

export { Product, Category, db };
