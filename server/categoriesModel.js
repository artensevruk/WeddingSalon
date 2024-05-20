import { Sequelize , DataTypes, INTEGER, DECIMAL } from "sequelize";
import { sequelize } from "./connectDatabase.js";
import { Product } from "./productModel.js";

export  const  Categories = sequelize.define('categories', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  categories: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false,

  // Other model options go here
}); 

Product.belongsTo(Categories)

// await Categories.sync();

// await Categories.bulkCreate([
//   {   
//     categories: "фата",
// },
//   { 
//     categories: "платье",
// },
// { 
//   categories: "ювелирка",
// }
// ]);