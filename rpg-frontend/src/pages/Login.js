import React from 'react';
import AuthForm from '../components/AuthForm';
import { login } from '../api/auth';
import { setToken } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  const handleLogin = async ({ email, senha }) => {
    try {
      const res = await login(email, senha);
      setToken(res.data.token);
      navigate('/home');
    } catch (err) {
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
