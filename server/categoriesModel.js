import { Sequelize , DataTypes, INTEGER, DECIMAL } from "sequelize";
import { sequelize } from "./connectDatabase.js";
import { Product } from "./productModel.js";

export const  Categories = sequelize.define('categories', {
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

Product.hasMany(Categories)



// await Categories.bulkCreate([
//   {   
//     categories: "укороченное",
//     productId: 24
// },
//   { 
//     categories: "длинное",
//     productId: 25
// },
// { 
//   categories: "длинное",
//   productId: 26
// },
// { 
//   categories: "в пол",
//   productId: 27
// },
// { 
//   categories: "длинное",
//   productId: 28
// },
// { 
//   categories: "длинное",
//   productId: 29
// }

// ]);