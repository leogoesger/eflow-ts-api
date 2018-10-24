import { Op } from 'sequelize';

interface IConfig {
  [index: string]: any;
}
export const config: IConfig = {
  development: {
    username: 'postgres',
    database: 'eflow_test',
    host: '127.0.0.1',
    post: 5432,
    dialect: 'postgres',
    logging: false,
    operatorsAliases: false,
    pool: {
      max: 30,
      min: 0,
      idle: 1000000,
      acquire: 1000000,
    },
  },
};
