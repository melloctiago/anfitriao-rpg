'use strict';

const Sequelize = require('Sequelize');
const sequelize = require('../config/db');

const User = require('./user')(sequelize, Sequelize.DataTypes);
const Personagem = require('./personagem')(sequelize, Sequelize.DataTypes);
const AtributosPersonagem = require('./AtributosPersonagem')(sequelize, Sequelize.DataTypes);
const InformacoesPersonagem = require('./InformacoesPersonagem')(sequelize, Sequelize.DataTypes);
const PericiasPersonagem = require('./PericiasPersonagem')(sequelize, Sequelize.DataTypes);
const Sala = require('./Sala')(sequelize, Sequelize.DataTypes);
const TokenPersonagem = require('./TokenPersonagem')(sequelize, Sequelize.DataTypes);

Personagem.hasOne(AtributosPersonagem, { foreignKey: 'personagem_id', as: 'atributos' });
AtributosPersonagem.belongsTo(Personagem, { foreignKey: 'personagem_id' });

Personagem.hasOne(InformacoesPersonagem, { foreignKey: 'personagem_id', as: 'informacoes' });
InformacoesPersonagem.belongsTo(Personagem, { foreignKey: 'personagem_id' });

Personagem.hasOne(PericiasPersonagem, { foreignKey: 'personagem_id', as: 'pericias' });
PericiasPersonagem.belongsTo(Personagem, { foreignKey: 'personagem_id' });

User.hasMany(Personagem, { foreignKey: 'usuario_id', as: 'personagens' });
Personagem.belongsTo(User, { foreignKey: 'usuario_id', as: 'dono' });

User.hasMany(Sala, { foreignKey: 'usuario_id', as: 'salas' });
Sala.belongsTo(User, { foreignKey: 'usuario_id', as: 'mestre' });

Sala.hasMany(TokenPersonagem, { foreignKey: 'sala_id', as: 'tokens' });
TokenPersonagem.belongsTo(Sala, { foreignKey: 'sala_id' });

Personagem.hasMany(TokenPersonagem, { foreignKey: 'personagem_id' });
TokenPersonagem.belongsTo(Personagem, { foreignKey: 'personagem_id', as: 'personagem' });



module.exports = {
  sequelize,
  Sequelize,
  User,
  Personagem,
  AtributosPersonagem,
  InformacoesPersonagem,
  PericiasPersonagem,
  Sala,            
  TokenPersonagem  
};