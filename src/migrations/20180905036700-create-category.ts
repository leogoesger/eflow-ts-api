import * as Sequelize from 'sequelize';
import { QueryInterface } from 'sequelize';

module.exports = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.createTable('Categories', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            name: {
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
            productId: {
                type: Sequelize.INTEGER,
                onDelete: 'CASCADE',
                references: {
                    model: 'Products',
                    key: 'id',
                },
            },
        });
    },
    down: (queryInterface: QueryInterface) => {
        return queryInterface.dropTable('Categories');
    },
};
