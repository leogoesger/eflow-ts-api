'use strict';
import { QueryInterface } from 'sequelize';

import { fallWinters } from '../seederData';

module.exports = {
  up: (queryInterface: QueryInterface, _: any) => {
    return queryInterface.bulkInsert('FallWinters', fallWinters);
  },
  down: (queryInterface: QueryInterface, _: any) => {
    return queryInterface.bulkDelete('FallWinters', {});
  },
};
