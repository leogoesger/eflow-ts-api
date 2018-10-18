import * as Sequelize from 'sequelize';
import { QueryInterface } from 'sequelize';

module.exports = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.createTable('Classifications', {
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
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      abbreviation: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      Avg: { type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)), allowNull: true },
      Std: { type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)), allowNull: true },
      CV: { type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)), allowNull: true },
      SP_Tim: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
        allowNull: true,
      },
      SP_Mag: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
        allowNull: true,
      },
      SP_Dur: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
        allowNull: true,
      },
      SP_ROC: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
        allowNull: true,
      },
      DS_Tim: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
        allowNull: true,
      },
      DS_Mag_10: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
        allowNull: true,
      },
      DS_Mag_50: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
        allowNull: true,
      },
      DS_Dur_WSI: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
        allowNull: true,
      },
      DS_Dur_WS: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
        allowNull: true,
      },
      DS_No_Flow: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
        allowNull: true,
      },
      WSI_Tim: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
        allowNull: true,
      },
      WSI_Mag: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
        allowNull: true,
      },
      Wet_Tim: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
        allowNull: true,
      },
      WSI_Dur: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
        allowNull: true,
      },
      Wet_BFL_Mag: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
        allowNull: true,
      },
      Peak_Tim_2: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
        allowNull: true,
      },
      Peak_Dur_2: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
        allowNull: true,
      },
      Peak_Fre_2: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
        allowNull: true,
      },
      Peak_Tim_5: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
        allowNull: true,
      },
      Peak_Dur_5: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
        allowNull: true,
      },
      Peak_Fre_5: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
        allowNull: true,
      },
      Peak_Tim_10: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
        allowNull: true,
      },
      Peak_Dur_10: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
        allowNull: true,
      },
      Peak_Fre_10: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
        allowNull: true,
      },
      Peak_Tim_20: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
        allowNull: true,
      },
      Peak_Dur_20: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
        allowNull: true,
      },
      Peak_Fre_20: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
        allowNull: true,
      },
      Peak_Tim_50: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
        allowNull: true,
      },
      Peak_Dur_50: {
        type: Sequelize.ARRAY(Sequelize.DECIMAL(10, 2)),
        allowNull: true,
      },
      Peak_Fre_50: {
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
    });
  },
  down: (queryInterface: QueryInterface) => {
    return queryInterface.dropTable('Classifications');
  },
};
