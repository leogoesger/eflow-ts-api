'use strict';
import { QueryInterface } from 'sequelize';

import { products } from '../seederData';

module.exports = {
    up: (queryInterface: QueryInterface, _: any) => {
        return queryInterface.bulkInsert('Products', products);
    },
    down: (queryInterface: QueryInterface, _: any) => {
        return queryInterface.bulkDelete('Products', {});
    },
};
