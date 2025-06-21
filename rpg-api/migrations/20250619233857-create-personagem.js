module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('personagem', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      origem: Sequelize.STRING,
      classe: Sequelize.STRING,
      nex: Sequelize.INTEGER,
      deslocamento: Sequelize.INTEGER
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('personagem');
  }
};
