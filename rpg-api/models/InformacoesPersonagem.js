module.exports = (sequelize, DataTypes) => {
  const InformacoesPersonagem = sequelize.define(
    'InformacoesPersonagem',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      personagem_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'personagem',
          key: 'id'
        }
      },
      pontos_vida: {
        type: DataTypes.INTEGER
      },
      pontos_esforco: {
        type: DataTypes.INTEGER
      },
      defesa: {
        type: DataTypes.INTEGER
      },
      sanidade: {
        type: DataTypes.INTEGER
      }
    },
    {
      tableName: 'informacoes_personagem',
      timestamps: false
    }
  );

  return InformacoesPersonagem;
};
