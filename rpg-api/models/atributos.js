const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Personagem = require('./Personagem');

const AtributosPersonagem = sequelize.define('AtributosPersonagem', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  personagem_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Personagem,
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
}, {
  tableName: 'atributos_personagem',
  timestamps: false
});

// Associação com Personagem
AtributosPersonagem.belongsTo(Personagem, { foreignKey: 'personagem_id' });
Personagem.hasOne(AtributosPersonagem, { foreignKey: 'personagem_id' });

module.exports = AtributosPersonagem;
