import { Sequelize , DataTypes, INTEGER, DECIMAL } from "sequelize";
import { sequelize } from "./connectDatabase.js";
import { Categories } from "./categoriesModel.js";
import { Product } from "./productModel.js";

export const  SubCategories = sequelize.define('subCategories', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false,

  // Other model options go here
}); 

Categories.hasMany(SubCategories)
Product.belongsTo(SubCategories)