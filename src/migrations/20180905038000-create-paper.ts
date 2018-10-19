import * as Sequelize from 'sequelize';
import { QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable('Papers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      type: {
        type: Sequelize.ENUM,
        values: ['HYDROLOGY', 'MORPHOLOGY', 'ECOLOGY', 'GENERAL'],
      },
      authors: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: true,
      },
      journal: {
        type: Sequelize.TEXT,
        allowNull: true,
      },

      imgUrl: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      publishedDate: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      paperUrl: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable('Papers');
  },
};
