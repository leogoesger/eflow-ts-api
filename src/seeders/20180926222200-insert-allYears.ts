'use strict';
import { QueryInterface } from 'sequelize';

import { allYears } from '../seederData';

module.exports = {
  up: (queryInterface: QueryInterface, _: any) => {
    return queryInterface.bulkInsert('AllYears', allYears);
  },
  down: (queryInterface: QueryInterface, _: any) => {
    return queryInterface.bulkDelete('AllYears', {});
  },
};
