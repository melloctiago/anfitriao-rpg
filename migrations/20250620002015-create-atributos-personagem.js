'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('atributos_personagem', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      personagem_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'personagem', // nome da tabela referenciada
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      agilidade: {
        type: Sequelize.INTEGER
      },
      inteligencia: {
        type: Sequelize.INTEGER
      },
      presenca: {
        type: Sequelize.INTEGER
      },
      forca: {
        type: Sequelize.INTEGER
      },
      vigor: {
        type: Sequelize.INTEGER
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('atributos_personagem');
  }
};
