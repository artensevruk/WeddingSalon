import { Sequelize , DataTypes, INTEGER, DECIMAL } from "sequelize";
import { sequelize } from "./connectDatabase.js";
import { Product } from "./productModel.js";

export const  Size = sequelize.define('size', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: false,

  // Other model options go here
}); 

Product.hasMany(Size)



// await Size.bulkCreate([
//   {   
//     size: "M",
//     productId: 24
// },
//   { 
//     size: "S",
//     productId: 25
// },
// { 
//   size: "XS",
//   productId: 26
// },
// { 
//   size: "XL",
//   productId: 27
// },
// { 
//   size: "XS",
//   productId: 27
// },
// { 
//   size: "XS",
//   productId: 28
// },
// { 
//   size: "XS",
//   productId: 29
// }

// ]);