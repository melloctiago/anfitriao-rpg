const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateEmail = require('../utils/validateEmail');
const { User } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'vibesveganas';

class AuthService {
  static async registrarUsuario({ nome, email, senha, confirmPassword, role }) {
    if (!nome || !email || !senha || !confirmPassword) {
      throw new Error('Por favor, preencha todos os campos');
    }

    if (senha !== confirmPassword) {
      throw new Error('As senhas não coincidem');
    }

    if (senha.length < 6) {
      throw new Error('A senha deve ter pelo menos 6 caracteres');
    }

    if (!validateEmail(email)) {
      throw new Error('Formato de email inválido.');
    }

    const usuarioExistente = await User.findOne({ where: { email } });
    if (usuarioExistente) {
      throw new Error('Email já está sendo utilizado');
    }

    const hashedPassword = await bcrypt.hash(senha, 8);
    const novoUsuario = await User.create({
      nome,
      email,
      senha: hashedPassword,
      role: role || 'usuario'
    });

    const token = jwt.sign({ id: novoUsuario.id }, JWT_SECRET, {
      expiresIn: '1h',
    });

    return { token, usuarioId: novoUsuario.id };
  }

  static async autenticarUsuario({ email, senha }) {
    
    if (!email || !senha) {
      throw new Error('Por favor, informe email e senha');
    }
    const usuario = await User.findOne({ where: { email } });
    if (!usuario) {
      throw new Error('Email ou senha incorretos');
    }
    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      throw new Error('Email ou senha incorretos');
    }

    const token = jwt.sign({ id: usuario.id }, JWT_SECRET, { expiresIn: '1h' });
        
    return {
      token,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, role: usuario.role },
    };
  }

  static async verificarToken(token) {
    const decoded = jwt.verify(token, JWT_SECRET);
    const usuario = await User.findByPk(decoded.id);

    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }
  
    

    return { id: usuario.id, nome: usuario.nome, email: usuario.email, role: usuario.role };
  }
}

module.exports = AuthService;
