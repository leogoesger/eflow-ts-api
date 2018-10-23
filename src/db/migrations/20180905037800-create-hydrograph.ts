import * as Sequelize from 'sequelize';
import { QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable('Hydrographs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      data: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
        allowNull: true,
      },
      percentille: {
        type: Sequelize.ENUM,
        values: [
          'MIN',
          'MAX',
          'TEN',
          'TWENTYFIVE',
          'FIFTY',
          'SEVENTYFIVE',
          'NINTY',
        ],
      },
      type: {
        type: Sequelize.ENUM,
        values: ['GAUGE', 'CLASS'],
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
      classId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Classifications',
          key: 'id',
        },
      },
    });
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable('Hydrographs');
  },
};
