'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'informacoes_personagem',
      [
        {
          personagem_id: 1,
          pontos_vida: 10,
          pontos_esforco: 50,
          defesa: 15,
          sanidade: 80
        }
      ,
      {
        personagem_id: 2,
        pontos_vida: 10,
        pontos_esforco: 50,
        defesa: 15,
        sanidade: 80
      }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('informacoes_personagem', null, {});
  }
};
