import { QueryInterface } from "sequelize";

import { springs } from "../seederData";

module.exports = {
  up: (queryInterface: QueryInterface, _: any) => {
    return queryInterface.bulkInsert("Springs", springs);
  },
  down: (queryInterface: QueryInterface, _: any) => {
    return queryInterface.bulkDelete("Springs", {});
  }
};
