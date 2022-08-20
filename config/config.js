const dotenv = require("dotenv");
dotenv.config();
const env = process.env;

module.exports = {
  development: {
    username: env.DB_USERNAME,
    password: env.DB_PASSWORD,
    database: env.DB_DATABASE,
    host: env.DB_HOST,
    dialect: "mysql"
  },
}
