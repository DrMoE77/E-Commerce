// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    // 1. defining the product id column
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },

    // 2. defining the product name column
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    // defining the product price column 
    price: {
      type: DataTypes.DECIMAL, 
      allowNull: false,
      // validating the column before creating or updating it 
      validate: {
        isDecimal: true
      }
    },
    // defining the product stock column
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // setting a default value
      defaultValue: 10,
      // validation before creating or updating
      validate: {
        isNumeric: true
      }
    },
    // defining the category id column
    category_id: {
      type: DataTypes.INTEGER,
      // setting the reference for the category id
      references: {
        model: 'category',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
