module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('personagem', [
      {
        id: 1,
        nome: 'Amelie Florence',
        origem: 'Universitário',
        classe: 'Ocultista',
        nex: 10,
        deslocamento: 8
      },
      {
        id: 2,
        nome: 'Olivier Florence',
        origem: 'Universitário ',
        classe: 'Especialista',
        nex: 8,
        deslocamento: 8
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('personagem', null, {});
  }
};
