import { Sequelize , DataTypes, INTEGER, DECIMAL } from "sequelize";
import { sequelize } from "./connectDatabase.js";

export const Product = sequelize.define('product', {
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




 await Product.bulkCreate([
  { name: 'Платье(Королева)' ,
    price: 1100.00,
    image: "image/4.jpg"
},
  { name: 'Платье(Длинное в пол)',
  price: 140.00,
  image: "image/6.jpg"

}
]);