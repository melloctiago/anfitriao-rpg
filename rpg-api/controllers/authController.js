const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'vibesveganas'
const { User } = require('../models');

exports.login = async (req, res) => {
  const { email, senha } = req.body;

  console.log('Tentativa de login com:', email);

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('Usuário não encontrado:', email);
      return res.status(401).json({ message: 'Usuário não encontrado' });
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);
    if (!senhaValida) {
      console.log('Senha incorreta para o usuário:', email);
      return res.status(401).json({ message: 'Senha inválida' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET,
      { expiresIn: '1h' }
    );

    console.log(token)
    console.log('Login bem-sucedido para:', email);

    res.json({ token });
  } catch (error) {
    console.error('Erro no login:', error.message);
    res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
  }
};
