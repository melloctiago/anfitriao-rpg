const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
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
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: 'users',
      timestamps: false,
    }
  );
  User.associate = function(models) {
    User.hasMany(models.Personagem, {
      foreignKey: 'usuario_id',
      as: 'personagens' 
    });
  };
  // Método para comparar senhas no login
  User.prototype.validarSenha = async function (senha) {
    return await bcrypt.compare(senha, this.senha);
  };

  return User;
};
