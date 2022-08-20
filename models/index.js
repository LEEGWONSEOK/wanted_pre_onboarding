const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];

const User = require('./user');
const Company = require('./company');
const Recruit = require('./recruit');
const db = {};
const sequelize = new Sequelize(
  config.database, 
  config.username, 
  config.password, 
  config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = User;
db.Company = Company;
db.Recruit = Recruit;

User.init(sequelize);
Company.init(sequelize);
Recruit.init(sequelize);

User.associate(db);
Company.associate(db);
Recruit.associate(db);

module.exports = db;
