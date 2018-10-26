'use strict';
import { QueryInterface } from 'sequelize';

import { annualFlows } from '../seederData';

module.exports = {
  up: (queryInterface: QueryInterface, _: any) => {
    return queryInterface.bulkInsert('AnnualFlows', annualFlows);
  },
  down: (queryInterface: QueryInterface, _: any) => {
    return queryInterface.bulkDelete('AnnualFlows', {});
  },
};
