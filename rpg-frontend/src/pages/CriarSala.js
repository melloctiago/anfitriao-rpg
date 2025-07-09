import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Auth.css';

function CriarSala() {
    const [nome, setNome] = useState('');
    const [imagemTabuleiro, setImagemTabuleiro] = useState(null);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setImagemTabuleiro(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!nome || !imagemTabuleiro) {
            setError('Por favor, preencha o nome da sala e selecione uma imagem.');
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('imagem_tabuleiro', imagemTabuleiro);

        try {
            const response = await api.post('/salas', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('Sala criada com sucesso! Redirecionando...');

            setTimeout(() => {
                navigate(`/tabuleiro/${response.data.id}`);
            }, 1500);

        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Erro ao criar a sala.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Criar Nova Sala</h2>
                <p>Crie uma nova sala de jogo e faça o upload do mapa do seu tabuleiro.</p>

                <input
                    type="text"
                    placeholder="Nome da Sala"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                />

                <label style={{ textAlign: 'left', display: 'block', marginBottom: '10px' }}>Imagem do Tabuleiro:</label>
                <input
                    type="file"
                    onChange={handleFileChange}
                    required
                    style={{ border: 'none', paddingLeft: '0' }}
                />

                {error && <p className="auth-error">{error}</p>}
                {message && <p style={{ color: 'green' }}>{message}</p>}

                <div className="auth-buttons-container">
                    <button type="submit" disabled={loading}>
                        {loading ? 'Criando...' : 'Criar Sala'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CriarSala;