import { Sequelize , DataTypes, INTEGER, DECIMAL } from "sequelize";
import { sequelize } from "./connectDatabase.js";

export const Product = await sequelize.define('product', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10 , 2),
    allowNull: false
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: false
  }
  
}, {
  timestamps: false
  // Other model options go here
}); 


 sequelize.sync({alter:true})

//  await Product.bulkCreate([
//   { name: 'Платье' ,
//     price: 300,
//     image: "image/1.jpg"
// },
//   { name: 'Фата',
//   price: 100.23,
//   image: "image/2.jpg"

// }
// ]);