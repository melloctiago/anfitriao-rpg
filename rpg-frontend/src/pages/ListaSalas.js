import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './ListaSalas.css'; 

const SalaCard = ({ sala }) => {
    const backendUrl = 'http://localhost:3000'; 

    return (
        <Link to={`/tabuleiro/${sala.id}`} className="sala-card-link">
            <div className="sala-card">
                <div
                    className="sala-card-banner"
                    style={{ backgroundImage: `url(${backendUrl}/uploads/${sala.imagem_tabuleiro_url})` }}
                >
                    <div className="sala-card-overlay">
                        <h3>{sala.nome}</h3>
                    </div>
                </div>
                <div className="sala-card-info">
                    <p>Mestre: {sala.mestre?.nome || 'Desconhecido'}</p>
                </div>
            </div>
        </Link>
    );
};


function ListaSalas() {
    const [salas, setSalas] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const carregarSalas = async () => {
            try {
                setLoading(true);
                const response = await api.get('/salas'); 
                setSalas(response.data);
            } catch (error) {
                console.error('Erro ao carregar salas:', error);
            } finally {
                setLoading(false);
            }
        };

        carregarSalas();
    }, []);

    if (loading) return <div>Carregando salas...</div>;

    return (
        <div className="lista-salas-container">
            <div className="lista-salas-header">
                <h2>Salas Disponíveis</h2>
                <button onClick={() => navigate('/salas/criar')} className="btn-criar-sala">
                    + Criar Nova Sala
                </button>
            </div>

            {salas.length === 0 ? (
                <p>Nenhuma sala foi criada ainda :/ </p>
            ) : (
                <div className="salas-grid">
                    {salas.map((sala) => (
                        <SalaCard key={sala.id} sala={sala} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ListaSalas;