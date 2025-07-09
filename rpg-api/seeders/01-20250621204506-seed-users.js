'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const senhaCriptografada = await bcrypt.hash('123456', 10);
    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        nome: 'Mestre',
        email: 'mestre@email.com',
        senha: senhaCriptografada,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        nome: 'Player',
        email: 'player@email.com',
        senha: senhaCriptografada,
        role: 'usuario',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
