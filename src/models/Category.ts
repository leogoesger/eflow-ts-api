import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../types';

interface ICategoryAttributes {
  id?: Int32Array; // id is an auto-generated UUID
  name: string;
}

type CategoryInstance = Sequelize.Instance<ICategoryAttributes> &
  ICategoryAttributes;

type CategoryModel = Sequelize.Model<CategoryInstance, ICategoryAttributes>;

const categoryFactory = (sequalize: Sequelize.Sequelize) => {
  const attributes: SequelizeAttributes<ICategoryAttributes> = {
    id: {
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: { type: Sequelize.STRING, allowNull: false },
  };
  const Category = sequalize.define<CategoryInstance, ICategoryAttributes>(
    'Category',
    attributes
  );
  Category.associate = models => {
    Category.belongsTo(models.Product, {
      foreignKey: 'productId',
      as: 'product',
    });
  };
  return Category;
};

export { categoryFactory, CategoryModel };
