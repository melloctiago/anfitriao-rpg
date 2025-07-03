const AuthService = require('../services/authService');

class AuthController {
  static async registro(req, res) {
    try {
      const resultado = await AuthService.registrarUsuario(req.body);

      res.status(201).json({
        message: 'Usuário registrado com sucesso',
        token: resultado.token,
        usuarioId: resultado.usuarioId,
      });
    } catch (error) {
      if (
        error.message.includes('campos') ||
        error.message.includes('senhas') ||
        error.message.includes('Email inválido')
      ) {
        return res.status(400).json({ error: error.message });
      }

      if (error.message === 'Email já está sendo utilizado') {
        return res.status(409).json({ error: error.message });
      }

      res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }

  static async login(req, res) {
    try {
      console.log("Chegou no auth controler pelo menos né veyr")
      console.log(req.body)
      const resultado = await AuthService.autenticarUsuario(req.body);

      res.status(200).json({
        message: 'Login realizado com sucesso',
        token: resultado.token,
        usuario: resultado.usuario,
      });
    } catch (error) {
      if (
        error.message.includes('Email ou senha') ||
        error.message.includes('informe email')
      ) {
        return res.status(401).json({ error: error.message });
      }

      res.status(500).json({ error: 'Erro interno no servidor' });
    }
  }
}

module.exports = AuthController;
