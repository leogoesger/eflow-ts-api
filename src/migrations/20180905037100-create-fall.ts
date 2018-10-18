import * as Sequelize from 'sequelize';
import { QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable('Falls', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      timing: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
        allowNull: true,
      },
      magnitude: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
        allowNull: true,
      },
      timingWet: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
        allowNull: true,
      },
      duration: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
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
      gaugeId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Gauges',
          key: 'id',
        },
      },
    });
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable('Falls');
  },
};
