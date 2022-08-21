// Recruit Table
const Sequelize = require('sequelize');

module.exports = class Recruit extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      recruitId: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        comment: '채용 공고 ID',
      },
      position: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '채용 포지션',
      },
      reward: {
        type: Sequelize.INTEGER,
        allowNull: false,
        comment: '채용 보상금',
      },
      skill: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '사용 기술',
      },
      desc: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: '채용 내용',
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Recruit',
      tableName: 'recruits',
      paranoid: false,
      charset: 'utf8',
      collate: "utf8_general_ci"
    });
  }

  static associate(db) {
    // Company : Recruit = 1 : N
    db.Recruit.belongsTo(db.Company, {
      foreignKey: 'companyId'
    });
    
    // Recruit : Applyment = 1 : N
    db.Recruit.hasMany(db.Applyment, {
      foreignKey: 'recruitId'
    });
  }
}