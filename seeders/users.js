'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        userId: 1,
        userName: '이권석'
      }, {
        userId: 2,
        userName: '이도경'
      }, {
        userId: 3,
        userName: '장재형'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  } 
};