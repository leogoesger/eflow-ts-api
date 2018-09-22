import { QueryInterface } from 'sequelize';

import { categories } from '../seederData';

module.exports = {
    up: (queryInterface: QueryInterface, _: any) => {
        return queryInterface.bulkInsert('Categories', categories);
    },
    down: (queryInterface: QueryInterface, _: any) => {
        return queryInterface.bulkDelete('Categories', {});
    },
};
