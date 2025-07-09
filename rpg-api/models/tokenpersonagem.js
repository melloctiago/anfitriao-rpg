'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TokenPersonagem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TokenPersonagem.init({
    sala_id: DataTypes.INTEGER,
    personagem_id: DataTypes.INTEGER,
    pos_x: DataTypes.INTEGER,
    pos_y: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TokenPersonagem',
  });
  return TokenPersonagem;
};