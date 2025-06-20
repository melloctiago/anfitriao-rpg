const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET = 'sua_chave_secreta';

//só to mockando pq ainda não tenho a tabela
const usuarioFalso = {
  id: 1,
  nome: 'admin',
  email: 'admin@exemplo.com',
  senhaHash: bcrypt.hashSync('123456', 8)
};

exports.login = (req, res) => {
  const { email, senha } = req.body;

  if (email !== usuarioFalso.email || !bcrypt.compareSync(senha, usuarioFalso.senhaHash)) {
    return res.status(401).json({ message: 'Credenciais inválidas' });
  }

  const token = jwt.sign(
    { id: usuarioFalso.id, email: usuarioFalso.email },
    SECRET,
    { expiresIn: '1h' } // configura a expiração do token
  );

  res.json({ auth: true, token });
};
