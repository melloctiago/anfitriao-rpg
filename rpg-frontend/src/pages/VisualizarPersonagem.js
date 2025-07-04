import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './VisualizarPersonagem.css'; 

const DisplayField = ({ label, value }) => (
    <div className="display-field">
        <strong>{label}:</strong>
        <span>{value}</span>
    </div>
);

export default function VisualizarPersonagem() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [personagem, setPersonagem] = useState(null);
    const [loading, setLoading] = useState(true);

    const backendUrl = 'http://localhost:3000';

    useEffect(() => {
        const fetchPersonagem = async () => {
            try {
                setLoading(true);
                const response = await api.get(`/personagens/${id}`);
                setPersonagem(response.data);
            } catch (err) {
                console.error("Erro ao buscar personagem:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchPersonagem();
    }, [id]);

    if (loading) return <div>Carregando...</div>;
    if (!personagem) return <div>Personagem não encontrado.</div>;

    return (
        <div className="view-container personagem-form">
            <h2>{personagem.nome}</h2>

            <div className="form-header" style={{ display: 'flex', alignItems: 'flex-start', gap: '30px', marginBottom: '20px' }}>
                <div className="profile-image-section" style={{ flexShrink: 0 }}>
                    {personagem.imagem_url ? (
                        <img
                            src={`${backendUrl}/uploads/${personagem.imagem_url}`}
                            alt={`Foto de ${personagem.nome}`}
                            style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ccc' }}
                        />
                    ) : (
                        <div style={{ width: '150px', height: '150px', borderRadius: '50%', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888', border: '2px dashed #ccc', textAlign: 'center' }}>
                            Sem Imagem
                        </div>
                    )}
                </div>
                <div className="basic-info-fields" style={{ flexGrow: 1 }}>
                    <DisplayField label="Origem" value={personagem.origem} />
                    <DisplayField label="Classe" value={personagem.classe} />
                </div>
            </div>

            <hr />

            <div className="form-section">
                <h3>Informações de Jogo</h3>
                <DisplayField label="NEX" value={`${personagem.nex}%`} />
                <DisplayField label="Deslocamento" value={personagem.deslocamento} />
                <DisplayField label="Defesa" value={personagem.informacoes?.defesa} />
                <DisplayField label="Pontos de Vida" value={personagem.informacoes?.pontos_vida} />
                <DisplayField label="Pontos de Esforço" value={personagem.informacoes?.pontos_esforco} />
                <DisplayField label="Sanidade" value={personagem.informacoes?.sanidade} />
            </div>

            <div className="form-section">
                <h3>Atributos</h3>
                <DisplayField label="Agilidade" value={personagem.atributos?.agilidade} />
                <DisplayField label="Inteligência" value={personagem.atributos?.inteligencia} />
                <DisplayField label="Vigor" value={personagem.atributos?.vigor} />
                <DisplayField label="Presença" value={personagem.atributos?.presenca} />
                <DisplayField label="Força" value={personagem.atributos?.forca} />
            </div>

            <div className="form-section">
                <h3>Perícias</h3>
                <DisplayField label="Diplomacia" value={personagem.pericias?.diplomacia} />
                <DisplayField label="Enganação" value={personagem.pericias?.enganacao} />
                <DisplayField label="Sobrevivência" value={personagem.pericias?.sobrevivencia} />
                <DisplayField label="Luta" value={personagem.pericias?.luta} />
                <DisplayField label="Tecnologia" value={personagem.pericias?.tecnologia} />
                <DisplayField label="Intuição" value={personagem.pericias?.intuicao} />
            </div>

            <div className="view-actions">
                <button className="btn btn-edit" onClick={() => navigate(`/editar/${personagem.id}`)}>Editar</button>
                <Link to="/home" className="btn btn-back">Voltar</Link>
            </div>
        </div>
    );
}