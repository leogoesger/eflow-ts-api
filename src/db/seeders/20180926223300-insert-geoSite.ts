import { QueryInterface } from 'sequelize';
import { geoSites } from '../seederData';

module.exports = {
  up: (queryInterface: QueryInterface, _: any) => {
    return queryInterface.bulkInsert('GeoSites', geoSites);
  },
  down: (queryInterface: QueryInterface, _: any) => {
    return queryInterface.bulkDelete('GeoSites', {});
  },
};
