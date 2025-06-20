import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import PersonagemForm from '../components/PersonagemForm';

function EditarPersonagem() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [personagem, setPersonagem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const carregarPersonagem = async () => {
      try {
        const response = await api.get(`/personagens/${id}`);
        setPersonagem(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao carregar personagem:', error);
        setLoading(false);
      }
    };

    carregarPersonagem();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      await api.put(`/personagens/${id}`, formData);
      navigate('/');
    } catch (error) {
      console.error('Erro ao atualizar personagem:', error);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (!personagem) return <div>Personagem não encontrado</div>;

  return (
    <div className="editar-personagem">
      <PersonagemForm personagem={personagem} onSubmit={handleSubmit} isEditing={true} />
    </div>
  );
}

export default EditarPersonagem;
