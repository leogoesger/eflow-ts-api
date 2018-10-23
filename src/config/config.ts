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
  },
};
