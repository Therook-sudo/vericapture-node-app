const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("mydatabase", "admin", "secret", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = sequelize;
