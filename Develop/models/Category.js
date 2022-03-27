const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Category extends Model {}

Category.init(
  {
    // define columns

    // defining the id column for the category
    id: {
      type: DataTypes.INTEGER, // as it an id
      allowNull : false,  
      primaryKey: true, // to set my own primary key
      autoIncrement: true
    },

    // defiining the column for category name 
    category_name: {
      type: DataTypes.STRING, // datatype is a string
      allowNull: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;
