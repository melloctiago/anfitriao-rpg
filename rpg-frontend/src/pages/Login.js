import React from 'react';
import AuthForm from '../components/AuthForm';
import api from '../services/api';
import { setToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async ({ email, senha }) => {
    console.log('Tentando logar com:', email, senha); 

    try {
      const res = await api.post('/login', { email, senha });

      console.log('Resposta do backend:', res.data); 

      setToken(res.data.token);
      navigate('/home');
    } catch (err) {
      console.error('Erro no login:', err.response?.data || err.message); 
      alert('Login falhou');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <AuthForm onSubmit={handleLogin} />
    </div>
  );
}
