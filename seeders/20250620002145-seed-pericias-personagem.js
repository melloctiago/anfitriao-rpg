'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('pericias_personagem', [
      {
        personagem_id: 1,
        diplomacia: 2,
        enganacao: 3,
        sobrevivencia: 4,
        luta: 5,
        tecnologia: 1,
        intuicao: 6
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('pericias_personagem', null, {});
  }
};
