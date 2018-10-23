import * as Sequelize from 'sequelize';
import { QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable('UploadData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      startDate: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      flowMatrix: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      yearRanges: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      DRH: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      allYear: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      winter: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      fall: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      summer: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      spring: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      fallWinter: {
        type: Sequelize.JSONB,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      userId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Users',
          key: 'id',
        },
      },
    });
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable('UploadData');
  },
};
