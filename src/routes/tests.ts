import { Router } from 'express';
import { Product, Category } from '../models';

const test = Router();

test.route('/').get((_, res) => {
    Product.findAll().then(data => res.status(200).send(data));
});

test.route('/category').get((_, res) => {
    Category.findAll().then(data => res.status(200).send(data));
});

export default test;
