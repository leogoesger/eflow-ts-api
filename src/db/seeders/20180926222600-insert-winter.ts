'use strict';
import { QueryInterface } from 'sequelize';

import { winters } from '../seederData';

module.exports = {
  up: (queryInterface: QueryInterface, _: any) => {
    return queryInterface.bulkInsert('Winters', winters);
  },
  down: (queryInterface: QueryInterface, _: any) => {
    return queryInterface.bulkDelete('Winters', {});
  },
};
