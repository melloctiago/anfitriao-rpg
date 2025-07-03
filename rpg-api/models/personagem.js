module.exports = (sequelize, DataTypes) => {
  const Personagem = sequelize.define(
    'Personagem',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false
      },
      origem: {
        type: DataTypes.STRING
      },
      classe: {
        type: DataTypes.STRING
      },
      nex: {
        type: DataTypes.INTEGER
      },
      deslocamento: {
        type: DataTypes.INTEGER
      },
      imagem_url: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {
      tableName: 'personagem',
      timestamps: false
    }
  );

  return Personagem;
};