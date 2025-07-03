'use strict';

const Sequelize = require('Sequelize');
const sequelize = require('../config/db');

// Import all models
const User = require('./user')(sequelize, Sequelize.DataTypes);
const Personagem = require('./personagem')(sequelize, Sequelize.DataTypes);
const AtributosPersonagem = require('./AtributosPersonagem')(sequelize, Sequelize.DataTypes);
const InformacoesPersonagem = require('./InformacoesPersonagem')(sequelize, Sequelize.DataTypes);
const PericiasPersonagem = require('./PericiasPersonagem')(sequelize, Sequelize.DataTypes);

// Define associations
Personagem.hasOne(AtributosPersonagem, { foreignKey: 'personagem_id', as: 'atributos' });
AtributosPersonagem.belongsTo(Personagem, { foreignKey: 'personagem_id' });

Personagem.hasOne(InformacoesPersonagem, { foreignKey: 'personagem_id', as: 'informacoes' });
InformacoesPersonagem.belongsTo(Personagem, { foreignKey: 'personagem_id' });

Personagem.hasOne(PericiasPersonagem, { foreignKey: 'personagem_id', as: 'pericias' });
PericiasPersonagem.belongsTo(Personagem, { foreignKey: 'personagem_id' });

module.exports = {
  sequelize,
  Sequelize,
  User,
  Personagem,
  AtributosPersonagem,
  InformacoesPersonagem,
  PericiasPersonagem
};