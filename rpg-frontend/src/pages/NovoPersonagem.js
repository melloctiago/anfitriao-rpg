import React from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import PersonagemForm from '../components/PersonagemForm';

function NovoPersonagem() {
    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        try {
            await api.post('/personagens', formData);
            navigate('/');
        } catch (error) {
            console.error('Erro ao criar personagem:', error);
        }
    };

    return (
        <div className="novo-personagem">
            <PersonagemForm onSubmit={handleSubmit} isEditing={false} />
        </div>
    );
}

export default NovoPersonagem;