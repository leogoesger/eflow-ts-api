'use strict';
import { QueryInterface } from 'sequelize';
import { geoClasses } from '../seederData';

module.exports = {
  up: (queryInterface: QueryInterface, _: any) => {
    return queryInterface.bulkInsert('GeoClasses', geoClasses);
  },
  down: (queryInterface: QueryInterface, _: any) => {
    return queryInterface.bulkDelete('GeoClasses', {});
  },
};
