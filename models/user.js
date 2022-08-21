// User Table
const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      userId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        comment: '유저 ID',
      },
      userName: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '유저 이름',
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: false,
      charset: 'utf8',
      collate: "utf8_general_ci"
    });
  }

  static associate(db) {
    // User : Applyment = 1 : N
    db.User.hasMany(db.Applyment, {
      foreignKey: 'userId'
    });

  }
}