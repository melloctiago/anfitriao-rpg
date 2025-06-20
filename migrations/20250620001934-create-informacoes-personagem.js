'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('informacoes_personagem', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      personagem_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'personagem',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      pontos_vida: {
        type: Sequelize.INTEGER
      },
      pontos_esforco: {
        type: Sequelize.INTEGER
      },
      defesa: {
        type: Sequelize.INTEGER
      },
      sanidade: {
        type: Sequelize.INTEGER
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('informacoes_personagem');
  }
};
