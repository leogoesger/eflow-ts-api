import { QueryInterface, Sequelize } from "sequelize";

module.exports = {
  up: (queryInterface: QueryInterface, _: any) => {
    const promises: any[] = [];

    promises.push(
      queryInterface.sequelize
        .query(`INSERT INTO "public"."Conditions" ("conditions", "gaugeId", "updatedAt", "createdAt")
        VALUES ('{WET, DRY}', 10295500,
      '2017-11-19T17:25:28.445Z',
      '2017-11-19T17:25:28.445Z')`)
    );

    promises.push(
      queryInterface.sequelize
        .query(`INSERT INTO "public"."Conditions" ("conditions", "gaugeId", "updatedAt", "createdAt")
        VALUES ('{DRY, WET}', 10308783,
      '2017-11-19T17:25:28.445Z',
      '2017-11-19T17:25:28.445Z')`)
    );

    return Promise.all(promises);
  },
  down: (queryInterface: QueryInterface, _: any) => {
    return queryInterface.bulkDelete("Conditions", {});
  }
};
