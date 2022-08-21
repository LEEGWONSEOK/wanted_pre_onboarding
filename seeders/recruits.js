'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('recruits', [
      {
        recruitId: 1,
        position: '백엔드',
        reward: 500000,
        skill: 'Node.js',
        desc: 'Node.js를 자유자재로 다룰줄 아는 사람',
        companyId: 1
      }, {
        recruitId: 2,
        position: '프론트엔드',
        reward: 500000,
        skill: 'Vue.js',
        desc: 'Vue.js를 자유자재로 다룰줄 아는 사람',
        companyId: 1
      }, {
        recruitId: 3,
        position: '데이터분석가',
        reward: 500000,
        skill: 'Python',
        desc: '데이터를 자유자재로 다룰줄 아는 사람',
        companyId: 1
      }, 
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('recruits', null, {});
  } 
};