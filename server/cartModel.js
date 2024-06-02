import { Sequelize , DataTypes, INTEGER, DECIMAL } from "sequelize";
import { sequelize } from "./connectDatabase.js";
import { Product } from "./productModel.js";
import { User } from "./userModel.js";
import { Size } from "./sizeModel.js";
import { Color } from "./colorModel.js";


export const CartProduct = sequelize.define('cartProduct', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false
  }
}, {
  timestamps: false,

  // Other model options go here
}); 

CartProduct.belongsTo(Product)
CartProduct.belongsTo(User);
CartProduct.belongsTo(Size);
CartProduct.belongsTo(Color);
// await CartProduct.sync();

// await CartProduct.bulkCreate([
//   {   
//     quantity: 1,
//     productId: 27
// }
// ]);