import { QueryInterface } from 'sequelize';
import { geoRegions } from '../seederData';

module.exports = {
  up: (queryInterface: QueryInterface, _: any) => {
    return queryInterface.bulkInsert('GeoRegions', geoRegions);
  },
  down: (queryInterface: QueryInterface, _: any) => {
    return queryInterface.bulkDelete('GeoRegions', {});
  },
};
