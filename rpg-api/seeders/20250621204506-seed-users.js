'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const senhaCriptografada = await bcrypt.hash('123456', 10);
    await queryInterface.bulkInsert('users', [
      {
        nome: 'Admin',
        email: 'admin@email.com',
        senha: senhaCriptografada,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
