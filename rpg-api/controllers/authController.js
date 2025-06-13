const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Chave secreta (use uma variável de ambiente na prática)
const SECRET = 'sua_chave_secreta';

// Simulação de usuário do banco de dados
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
        { expiresIn: '1h' } // expira em 1 hora
    );

    res.json({ auth: true, token });
};
