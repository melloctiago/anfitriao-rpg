const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Personagem = require('./Personagem');

const PericiasPersonagem = sequelize.define('PericiasPersonagem', {
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
  diplomacia: {
    type: DataTypes.INTEGER
  },
  enganacao: {
    type: DataTypes.INTEGER
  },
  sobrevivencia: {
    type: DataTypes.INTEGER
  },
  luta: {
    type: DataTypes.INTEGER
  },
  tecnologia: {
    type: DataTypes.INTEGER
  },
  intuicao: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'pericias_personagem',
  timestamps: false
});

PericiasPersonagem.belongsTo(Personagem, { foreignKey: 'personagem_id' });
Personagem.hasOne(PericiasPersonagem, { foreignKey: 'personagem_id' });

module.exports = PericiasPersonagem;
