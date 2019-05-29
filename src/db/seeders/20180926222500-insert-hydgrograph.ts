import { QueryInterface } from "sequelize";

import { hydrograph } from "../seederData";

module.exports = {
  up: (queryInterface: QueryInterface, _: any) => {
    return queryInterface.bulkInsert("Hydrographs", hydrograph);
  },
  down: (queryInterface: QueryInterface, _: any) => {
    return queryInterface.bulkDelete("Hydrographs", {});
  }
};
