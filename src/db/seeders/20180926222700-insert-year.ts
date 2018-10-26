'use strict';
import { QueryInterface } from 'sequelize';

import { years } from '../seederData';

module.exports = {
  up: (queryInterface: QueryInterface, _: any) => {
    return queryInterface.bulkInsert('Years', years);
  },
  down: (queryInterface: QueryInterface, _: any) => {
    return queryInterface.bulkDelete('Years', {});
  },
};
