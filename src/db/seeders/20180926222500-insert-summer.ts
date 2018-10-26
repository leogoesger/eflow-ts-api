'use strict';
import { QueryInterface } from 'sequelize';

import { summers } from '../seederData';

module.exports = {
  up: (queryInterface: QueryInterface, _: any) => {
    return queryInterface.bulkInsert('Summers', summers);
  },
  down: (queryInterface: QueryInterface, _: any) => {
    return queryInterface.bulkDelete('Summers', {});
  },
};
