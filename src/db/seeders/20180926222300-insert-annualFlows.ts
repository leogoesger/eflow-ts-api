'use strict';
import { QueryInterface } from 'sequelize';

import { annualFlow } from '../seederData';

module.exports = {
  up: (queryInterface: QueryInterface, _: any) => {
    return queryInterface.bulkInsert('AnnualFlows', annualFlow);
  },
  down: (queryInterface: QueryInterface, _: any) => {
    return queryInterface.bulkDelete('AnnualFlows', {});
  },
};
