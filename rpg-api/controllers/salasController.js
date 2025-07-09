const db = require('../models');
const { Sala, TokenPersonagem, Personagem, User } = db;
const { sequelize } = require('../models');
const { getTokenFromHeader } = require('../utils/authUtils');
const AuthService = require('../services/authService');

exports.listarSalas = async (req, res) => {
    try {
        const token = getTokenFromHeader(req);
        await AuthService.verificarToken(token);

        const salas = await Sala.findAll({
            include: {
                model: User,
                as: 'mestre',
                attributes: ['id', 'nome']
            }
        });
        res.status(200).json(salas);
    } catch (error) {
        if (error.message.includes('token')) {
            return res.status(401).json({ message: error.message });
        }
        res.status(500).json({ message: 'Erro ao listar salas.', error: error.message });
    }
};

exports.getSalaById = async (req, res) => {
    try {
        const token = getTokenFromHeader(req);
        await AuthService.verificarToken(token);
        const { id } = req.params;
        const sala = await Sala.findByPk(id, {
            include: [
                { model: User, as: 'mestre', attributes: ['id', 'nome'] },
                {
                    model: TokenPersonagem,
                    as: 'tokens',
                    include: {
                        model: Personagem,
                        as: 'personagem',
                        attributes: ['id', 'nome', 'imagem_url']
                    }
                }
            ]
        });

        if (!sala) {
            return res.status(404).json({ message: 'Sala não encontrada.' });
        }

        res.status(200).json(sala);
    } catch (error) {
        if (error.message.includes('token')) {
            return res.status(401).json({ message: error.message });
        }
        res.status(500).json({ message: 'Erro ao buscar dados da sala.', error: error.message });
    }
};

exports.createSala = async (req, res) => {
    try {
        const token = getTokenFromHeader(req);
        const usuarioVerificado = await AuthService.verificarToken(token);

        const { nome } = req.body;

        if (!nome) {
            return res.status(400).json({ message: 'O nome da sala é obrigatório.' });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'A imagem do tabuleiro é obrigatória.' });
        }

        const novaSala = await Sala.create({
            nome: nome,
            imagem_tabuleiro_url: req.file.filename,
            usuario_id: usuarioVerificado.id
        });

        res.status(201).json(novaSala);
    } catch (error) {
        if (error.message.includes('token')) {
            return res.status(401).json({ message: error.message });
        }
        console.error("ERRO DETALHADO AO CRIAR SALA:", error);
        res.status(500).json({ message: 'Erro ao criar a sala.', error: error.message });
    }
};
exports.entrarNaSala = async (req, res) => {
    try {
        const token = getTokenFromHeader(req);
        const usuarioVerificado = await AuthService.verificarToken(token);
        const usuarioId = usuarioVerificado.id;

        const { id: salaId } = req.params;
        const { personagemId } = req.body;

        const personagem = await Personagem.findOne({ where: { id: personagemId, usuario_id: usuarioId } });
        if (!personagem) {
            return res.status(403).json({ message: 'Você não tem permissão para adicionar este personagem.' });
        }

        const tokenExistente = await TokenPersonagem.findOne({ where: { sala_id: salaId, personagem_id: personagemId } });
        if (tokenExistente) {
            return res.status(409).json({ message: 'Este personagem já está na sala.' });
        }

        const novoToken = await TokenPersonagem.create({
            sala_id: salaId,
            personagem_id: personagemId,
            pos_x: 50,
            pos_y: 50
        });

        const tokenCompleto = await TokenPersonagem.findByPk(novoToken.id, {
            include: { model: Personagem, as: 'personagem', attributes: ['id', 'nome', 'imagem_url'] }
        });

        const io = req.app.get('io');
        io.to(salaId).emit('token_adicionado', tokenCompleto);

        res.status(201).json(tokenCompleto);
    } catch (error) {
        if (error.message.includes('token')) {
            return res.status(401).json({ message: error.message });
        }
        console.error("Erro ao entrar na sala:", error);
        res.status(500).json({ message: 'Erro ao entrar na sala.', error: error.message });
    }
};
exports.removerDoTabuleiro = async (req, res) => {
    try {
        const token = getTokenFromHeader(req);
        const usuarioVerificado = await AuthService.verificarToken(token);

        const { salaId, personagemId } = req.params;

        const sala = await Sala.findByPk(salaId);
        if (!sala) {
            return res.status(404).json({ message: 'Sala não encontrada.' });
        }
        const personagem = await Personagem.findByPk(personagemId);
        if (!personagem) {
            return res.status(404).json({ message: 'Personagem não encontrado.' });
        }

        // Isso tive que criar pra deixar o usuario excluir se for dono do personagem
        const eMestreDaSala = sala.usuario_id === usuarioVerificado.id;
        const eDonoDoPersonagem = personagem.usuario_id === usuarioVerificado.id;
        const eAdmin = usuarioVerificado.role === 'admin';

        if (!eMestreDaSala && !eDonoDoPersonagem && !eAdmin) {
            return res.status(403).json({ message: 'Você não tem permissão para remover este personagem.' });
        }

        const deleted = await TokenPersonagem.destroy({
            where: {
                sala_id: salaId,
                personagem_id: personagemId
            }
        });

        if (!deleted) {
            return res.status(404).json({ message: 'Token não encontrado no tabuleiro.' });
        }

        const io = req.app.get('io');
        io.to(salaId).emit('token_removido', { personagemId: parseInt(personagemId) })

        res.status(200).json({ message: 'Personagem removido do tabuleiro com sucesso.' });
    } catch (error) {
        if (error.message.includes('token')) {
            return res.status(401).json({ message: error.message });
        }
        console.error("Erro ao remover do tabuleiro:", error);
        res.status(500).json({ message: 'Erro ao remover personagem.', error: error.message });
    }
};