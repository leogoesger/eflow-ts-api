'use strict';
import { QueryInterface } from 'sequelize';

import { gauges } from '../seederData';

module.exports = {
  up: (queryInterface: QueryInterface, _: any) => {
    return queryInterface.bulkInsert('Gauges', gauges);
  },
  down: (queryInterface: QueryInterface, _: any) => {
    return queryInterface.bulkDelete('Gauges', {});
  },
};
