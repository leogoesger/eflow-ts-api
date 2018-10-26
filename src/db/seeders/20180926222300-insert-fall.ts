'use strict';
import { QueryInterface } from 'sequelize';

import { falls } from '../seederData';

module.exports = {
  up: (queryInterface: QueryInterface, _: any) => {
    return queryInterface.bulkInsert('Falls', falls);
  },
  down: (queryInterface: QueryInterface, _: any) => {
    return queryInterface.bulkDelete('Falls', {});
  },
};
