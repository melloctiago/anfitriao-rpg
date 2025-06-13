// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const SECRET = 'sua_chave_secreta';

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({ message: 'Token não fornecido' });

    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Token inválido' });

        req.userId = decoded.id;
        next();
    });
};
