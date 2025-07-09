const getTokenFromHeader = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Token de autenticação não fornecido ou mal formatado.');
  }
  return authHeader.split(' ')[1];
};

module.exports = { getTokenFromHeader };