import React from 'react';
import AuthForm from '../components/AuthForm';
import { register } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();

  const handleRegister = async (form) => {
    try {
      await register(form.nome, form.email, form.senha);
      alert('Usuário criado com sucesso!');
      navigate('/login');
    } catch (err) {
      alert('Erro ao cadastrar usuário');
    }
  };

  return (
    <div>
      <h2>Cadastro</h2>
      <AuthForm onSubmit={handleRegister} isRegister />
    </div>
  );
}
