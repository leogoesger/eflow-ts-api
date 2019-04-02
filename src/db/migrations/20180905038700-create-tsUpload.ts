import * as Sequelize from 'sequelize';
import { QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable('TsUploads', {
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
      riverName: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      location: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      params:{
        type: Sequelize.TEXT,
        allowNull: true,
      },
      failed: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      dates: {
        type: Sequelize.ARRAY(Sequelize.STRING),
        allowNull: false,
      },
      flows: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
        allowNull: false,
      },
      startDate: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      flowMatrix: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      yearRanges: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      DRH: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      allYear: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      winter: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      fall: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      summer: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      spring: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      fallWinter: {
        type: Sequelize.JSONB,
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
      userId: {
        allowNull: false,
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
    return queryInterface.dropTable('TsUploads');
  },
};
