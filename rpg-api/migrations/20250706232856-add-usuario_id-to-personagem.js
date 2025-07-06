'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      'personagem', 
      'usuario_id',
      {
        type: Sequelize.INTEGER,
        allowNull: false, 
        references: {
          model: 'users', 
          key: 'id',      
        },
        onUpdate: 'CASCADE', 
        onDelete: 'CASCADE', 
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('personagem', 'usuario_id');
  }
};