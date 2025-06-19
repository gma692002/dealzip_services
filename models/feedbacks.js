'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feedback extends Model {
    static associate(models) {
      // define association here if needed
    }
  }
  Feedback.init(
    {
      id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
      name: {type: DataTypes.STRING(100), allowNull: false},
      phone: {type: DataTypes.STRING(20), allowNull: true},
      email: {type: DataTypes.STRING(100), allowNull: false},
      message: {type: DataTypes.TEXT, allowNull: false},
    },
    {
      sequelize,
      modelName: 'Feedback',
      tableName: 'feedbacks',
      underscored: true,
    },
  );
  return Feedback;
};
