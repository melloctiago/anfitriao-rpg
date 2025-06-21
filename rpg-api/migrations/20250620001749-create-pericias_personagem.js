'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pericias_personagem', {
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
      diplomacia: {
        type: Sequelize.INTEGER
      },
      enganacao: {
        type: Sequelize.INTEGER
      },
      sobrevivencia: {
        type: Sequelize.INTEGER
      },
      luta: {
        type: Sequelize.INTEGER
      },
      tecnologia: {
        type: Sequelize.INTEGER
      },
      intuicao: {
        type: Sequelize.INTEGER
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('pericias_personagem');
  }
};
