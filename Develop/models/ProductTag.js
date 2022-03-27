const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    // 1. first column --> id
    id: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // 2. second column --> product id
    product_id: {
      type: DataTypes.INTEGER,
      // references the product model's id 
      references: {
        model: 'product',
        key: 'id'
      }
    },
    // 2. third column --> tag id
    tag_id: {
      type: DataTypes.INTEGER,
      // references the tag model's id 
      references: {
        model: 'tag',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;
