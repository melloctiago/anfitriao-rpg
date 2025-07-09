import React, { useState, useEffect } from 'react';
import api from '../services/api';
import PersonagemCard from './PersonagemCard';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../context/SocketContext';

function ListaPersonagens() {
  const [personagens, setPersonagens] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const socket = useSocket();

  const carregarPersonagens = async () => {
    try {
      const response = await api.get('/personagens');
      setPersonagens(response.data);
    } catch (error) {
      console.error('Erro ao carregar personagens:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarPersonagens();

    if (socket) {
      socket.on('personagens_atualizados', () => {
        carregarPersonagens();
      });

      return () => {
        socket.off('personagens_atualizados');
      };
    }
  }, [socket]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/personagens/${id}`);

    } catch (error) {
      console.error('Erro ao deletar personagem:', error);
    }
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="lista-personagens">
      <h2>Meus personagens</h2>
      {personagens.length === 0 ? (
        <p>nenhum personagem por aqui '-'</p>
      ) : (
        <div className="personagens-grid">
          {personagens.map((personagem) => (
            <PersonagemCard
              key={personagem.id}
              personagem={personagem}
              onDelete={handleDelete}
              onEdit={() => navigate(`/editar/${personagem.id}`)}
              onVisualize={() => navigate(`/personagem/${personagem.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ListaPersonagens;
