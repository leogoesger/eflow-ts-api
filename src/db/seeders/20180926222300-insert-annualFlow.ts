'use strict';
import { QueryInterface } from 'sequelize';

import { annualFlow } from '../seederData';

module.exports = {
  up: (queryInterface: QueryInterface, _: any) => {
    return queryInterface.bulkInsert('AnnualFlow', annualFlow);
  },
  down: (queryInterface: QueryInterface, _: any) => {
    return queryInterface.bulkDelete('AnnualFlow', {});
  },
};
