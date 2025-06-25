// Salva o token no localStorage
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

// Recupera o token do localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Verifica se está autenticado (se existe um token)
export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

// Remove o token (para logout)
export const logout = () => {
  localStorage.removeItem('token');
};
