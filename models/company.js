// Company Table
const Sequelize = require('sequelize');

module.exports = class Company extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      companyId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        comment: '유저 ID',
      },
      companyName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        comment: '회사 이름',
      },
      nation: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '회사 이름',
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '회사 지역',
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Company',
      tableName: 'companys',
      paranoid: false,
      charset: 'utf8',
      collate: "utf8_general_ci"
    });
  }

  static associate(db) {
    // Company : Recruit = 1 : N
    db.Company.hasMany(db.Recruit, {
      foreignKey: 'companyId'
    });
  }
}