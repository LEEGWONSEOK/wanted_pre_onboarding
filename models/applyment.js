// Applyment(User - Recruit) Table
const Sequelize = require('sequelize');

module.exports = class Applyment extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Applyment',
      tableName: 'applyments',
      paranoid: false,
      charset: 'utf8',
      collate: "utf8_general_ci"
    });
  }

  static associate(db) {
    // User : Applyment = 1 : N
    db.Applyment.belongsTo(db.User, {
      foreignKey: 'userId'
    });
    
    // Recruit : Applyment = 1 : N
    db.Applyment.belongsTo(db.Recruit, {
      foreignKey: 'recruitId'
    });
  }
}