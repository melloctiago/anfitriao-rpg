const authService = require('../services/authService');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        message: 'Token de acesso requerido',
      });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        message: 'Token de acesso inválido',
      });
    }

    const usuario = await authService.verificarToken(token);

    req.usuario = usuario;

    next();
  } catch (error) {
    console.error('Erro na autenticação:', error);
    console.log(req.headers)

    return res.status(401).json({
      message: 'Token inválido ou expirado',
    });
  }
};

module.exports = authMiddleware;
