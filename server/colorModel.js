import { Sequelize , DataTypes, INTEGER, DECIMAL } from "sequelize";
import { sequelize } from "./connectDatabase.js";
import { Product } from "./productModel.js";

export const  Color = sequelize.define('color', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false,

  // Other model options go here
}); 

Product.hasMany(Color)



// await Color.bulkCreate([
//   {   
//     color: "White",
//     productId: 24
// },
//   { 
//     color: "White",
//     productId: 25
// },
// { 
//   color: "Pink",
//   productId: 26
// },
// { 
//   color: "White",
//   productId: 27
// },
// { 
//   color: "Purple",
//   productId: 27
// },
// { 
//   color: "Purple",
//   productId: 28
// },
// { 
//   color: "Pink",
//   productId: 29
// }

// ]);