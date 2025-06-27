
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'vibesveganas';

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido' });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ message: 'Formato do token inválido' });
  }

  const token = parts[1];

  jwt.verify(token, SECRET, (err, decoded) => {
    console.log('Erro na verificação do token:', err.message);
    if (err) return res.status(401).json({ message: 'Token inválido' });

    req.userId = decoded.id; // ou qualquer outro campo codificado
    next();
  });
};


// const jwt = require('jsonwebtoken');
// const SECRET = 'sua_chave_secreta';

// module.exports = (req, res, next) => {
//   const token = req.headers['authorization'];

//   if (!token) return res.status(401).json({ message: 'Token não fornecido' });

//   jwt.verify(token, SECRET, (err, decoded) => {
//     if (err) return res.status(401).json({ message: 'Token inválido' });

//     req.userId = decoded.id;
//     next();
//   });
// };
