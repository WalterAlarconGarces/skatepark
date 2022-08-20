const { Sequelize }  = require('sequelize');

require('dotenv').config();

const sequelize = new Sequelize(process.env.DB, process.env.DBUSER, process.env.DBPASSWORD, {
    host: process.env.DBHOST,
    dialect: process.env.DBDIALECT,
  });

module.exports = sequelize