'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('companys', [
      {
        companyId: 1,
        companyName: '원티드',
        nation: '한국',
        city: '서울시 강남구'
      }, {
        companyId: 2,
        companyName: '네이버',
        nation: '한국',
        city: '성남시 분당구'
      }, {
        companyId: 3,
        companyName: '모두싸인',
        nation: '한국',
        city: '부산시 해운대구'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('companys', null, {});
  } 
};