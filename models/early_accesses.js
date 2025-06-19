'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EarlyAccess extends Model {
    static associate(models) {
      // define association here if needed
    }
  }
  EarlyAccess.init(
    {
      id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
      email: {type: DataTypes.STRING(100), allowNull: false, unique: true},
    },
    {
      sequelize,
      modelName: 'EarlyAccess',
      tableName: 'early_accesses',
      underscored: true,
    },
  );
  return EarlyAccess;
};
