'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TokenPersonagems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sala_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Salas', key: 'id' },
        onDelete: 'CASCADE'
      },
      personagem_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'personagem', key: 'id' },
        onDelete: 'CASCADE'
      },
      pos_x: {
        type: Sequelize.INTEGER
      },
      pos_y: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TokenPersonagems');
  }
};