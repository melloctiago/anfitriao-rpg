import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Draggable from 'react-draggable';
import { useSocket } from '../context/SocketContext';
import api from '../services/api';
import './Tabuleiro.css';

const DraggableToken = ({ token, onDragStop }) => {
    const nodeRef = useRef(null);

    return (
        <Draggable
            nodeRef={nodeRef}
            position={{ x: token.pos_x, y: token.pos_y }}
            onStop={(e, data) => onDragStop(e, data, token.personagem_id)}
            bounds="parent"
        >
            <div ref={nodeRef} className="token">
                {token.personagem?.imagem_url ? (
                    <img src={`http://localhost:3000/uploads/${token.personagem.imagem_url}`} alt={token.personagem.nome} />
                ) : (
                    <div className="token-placeholder">{token.personagem?.nome.charAt(0)}</div>
                )}
                <span>{token.personagem.nome}</span>
            </div>
        </Draggable>
    );
};


const Tabuleiro = () => {
    const { id: salaId } = useParams();
    const socket = useSocket();

    const [salaInfo, setSalaInfo] = useState(null);
    const [tokens, setTokens] = useState([]);
    const [meusPersonagens, setMeusPersonagens] = useState([]);
    const [loading, setLoading] = useState(true);

    const personagensDisponiveis = useMemo(() => {
        const idsDosTokensNoMapa = tokens.map(token => token.personagem_id);
        return meusPersonagens.filter(p => !idsDosTokensNoMapa.includes(p.id));
    }, [meusPersonagens, tokens]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [salaResponse, personagensResponse] = await Promise.all([
                    api.get(`/salas/${salaId}`),
                    api.get('/personagens')
                ]);
                setSalaInfo(salaResponse.data);
                setTokens(salaResponse.data.tokens || []);
                setMeusPersonagens(personagensResponse.data);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();

        if (socket) {
            socket.emit('entrar_sala', salaId);

            const handleTokenMovido = (data) => {
                const { personagemId, novaPosicao } = data;
                setTokens(prevTokens =>
                    prevTokens.map(token =>
                        token.personagem_id === personagemId ? { ...token, pos_x: novaPosicao.x, pos_y: novaPosicao.y } : token
                    )
                );
            };

            const handleTokenAdicionado = (novoToken) => {
                setTokens(prevTokens => [...prevTokens, novoToken]);
            };
            const handleTokenRemovido = ({ personagemId }) => {
                console.log(`Personagem ${personagemId} removido via WebSocket`);
                setTokens(prevTokens => prevTokens.filter(token => token.personagem_id !== personagemId));
            };

            socket.on('token_movido', handleTokenMovido);
            socket.on('token_adicionado', handleTokenAdicionado);
            socket.on('token_removido', handleTokenRemovido);

            return () => {
                socket.off('token_movido', handleTokenMovido);
                socket.off('token_adicionado', handleTokenAdicionado);
                socket.off('token_removido', handleTokenRemovido)
            };
        }
    }, [salaId, socket]);

    const handleAdicionarPersonagem = async (personagemId) => {
        try {
            await api.post(`/salas/${salaId}/entrar`, { personagemId });
        } catch (error) {
            console.error('Erro ao adicionar personagem:', error);
            alert(error.response?.data?.message || 'Não foi possível adicionar o personagem.');
        }
    };
    const handleRemoverPersonagem = async (personagemId) => {
        try {
            await api.delete(`/salas/${salaId}/tokens/${personagemId}`);
        } catch (error) {
            console.error('Erro ao remover personagem:', error);
            alert(error.response?.data?.message || 'Não foi possível remover o personagem.');
        }
    };

    const handleDragStop = (e, data, personagemId) => {
        const novaPosicao = { x: data.x, y: data.y };
        socket.emit('mover_token', {
            salaId,
            personagemId,
            novaPosicao
        });
    };

    if (loading) return <div>Carregando tabuleiro...</div>;
    if (!salaInfo) return <div>Sala não encontrada.</div>;

    return (
        <div className="pagina-tabuleiro">
            <div className="painel-controle">
                <h3>Meus Personagens</h3>

                <ul className="lista-personagens-disponiveis">
                    {meusPersonagens.map(p => {
                        const tokenNoMapa = tokens.find(token => token.personagem_id === p.id);

                        return (
                            <li key={p.id}>
                                <span>{p.nome}</span>
                                {tokenNoMapa ? (
                                    <button onClick={() => handleRemoverPersonagem(p.id)} className="btn-remover">-</button>
                                ) : (
                                    <button onClick={() => handleAdicionarPersonagem(p.id)} className="btn-adicionar">+</button>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div
                className="tabuleiro-container"
                style={{ backgroundImage: `url(http://localhost:3000/uploads/${salaInfo.imagem_tabuleiro_url})` }}
            >

                {tokens.map(token => (
                    <DraggableToken
                        key={token.id}
                        token={token}
                        onDragStop={handleDragStop}
                    />
                ))}
            </div>
        </div>
    );
};

export default Tabuleiro;