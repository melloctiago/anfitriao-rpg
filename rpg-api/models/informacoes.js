const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Personagem = require('./Personagem');

const InformacoesPersonagem = sequelize.define('InformacoesPersonagem', {
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
}, {
  tableName: 'informacoes_personagem',
  timestamps: false
});


InformacoesPersonagem.belongsTo(Personagem, { foreignKey: 'personagem_id' });
Personagem.hasOne(InformacoesPersonagem, { foreignKey: 'personagem_id' });

module.exports = InformacoesPersonagem;
