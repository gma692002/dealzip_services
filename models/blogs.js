'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    static associate(models) {
      // define association here if needed
    }
  }
  Blog.init(
    {
      id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
      title: {type: DataTypes.STRING(255), allowNull: false},
      slug: {type: DataTypes.STRING(255), allowNull: false, unique: true}, // <-- Added slug
      content: {type: DataTypes.TEXT, allowNull: false},
      category: {type: DataTypes.STRING(100), allowNull: true},
      view_count: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0},
      created_by_name: {type: DataTypes.STRING(100), allowNull: true},
    },
    {
      sequelize,
      modelName: 'Blog',
      tableName: 'blogs',
      underscored: true,
    },
  );
  return Blog;
};
