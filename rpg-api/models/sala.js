'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sala extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Sala.init({
    nome: DataTypes.STRING,
    imagem_tabuleiro_url: DataTypes.STRING,
    usuario_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Sala',
  });
  return Sala;
};