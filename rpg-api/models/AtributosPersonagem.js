module.exports = (sequelize, DataTypes) => {
  const AtributosPersonagem = sequelize.define(
    'AtributosPersonagem',
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
      agilidade: {
        type: DataTypes.INTEGER
      },
      inteligencia: {
        type: DataTypes.INTEGER
      },
      presenca: {
        type: DataTypes.INTEGER
      },
      forca: {
        type: DataTypes.INTEGER
      },
      vigor: {
        type: DataTypes.INTEGER
      }
    },
    {
      tableName: 'atributos_personagem',
      timestamps: false
    }
  );

  return AtributosPersonagem;
};
