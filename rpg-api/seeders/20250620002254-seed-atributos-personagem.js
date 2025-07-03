'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'atributos_personagem',
      [
        {
          personagem_id: 1,
          agilidade: 3,
          inteligencia: 4,
          presenca: 2,
          forca: 5,
          vigor: 4
        },
        {
          personagem_id: 2,
          agilidade: 3,
          inteligencia: 4,
          presenca: 2,
          forca: 5,
          vigor: 4
        }
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('atributos_personagem', null, {});
  }
};
