require('dotenv').config();
const fs = require('fs');
const path = require('path');
const dbConfig = require('../config/database.config');
const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: 'mysql',
  logging: process.env.APP_DEBUG === 'true',
  define: {
    freezeTableName: true,
    timestamps: false,
  },
  pool: dbConfig.pool,
});

sequelize
  .authenticate()
  .then(() => console.log('Database connection established.'))
  .catch(err => console.error('Unable to connect to the database:', err));

const db = {models: {}};
const basename = path.basename(__filename);

fs.readdirSync(__dirname)
  .filter(
    file =>
      file.endsWith('.js') && file !== basename && !file.endsWith('.test.js'),
  )
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db.models[model.name] = model;
  });

Object.values(db.models).forEach(model => {
  if (typeof model.associate === 'function') {
    model.associate(db.models);
  }
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
