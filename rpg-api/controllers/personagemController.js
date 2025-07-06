const db = require('../models');
const { sequelize } = require('../models');
const AuthService = require('../services/authService');

const { Personagem, InformacoesPersonagem, AtributosPersonagem, PericiasPersonagem } = db;

const getTokenFromHeader = (req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('Token de autenticação não fornecido ou mal formatado.');
  }
  return authHeader.split(' ')[1];
};


exports.createPersonagem = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const token = getTokenFromHeader(req);
    const usuarioVerificado = await AuthService.verificarToken(token);

    const {
      nome, origem, classe, nex, deslocamento, imagem_url,
      pontos_vida, pontos_esforco, defesa, sanidade,
      agilidade, inteligencia, presenca, forca, vigor,
      diplomacia, enganacao, sobrevivencia, luta, tecnologia, intuicao
    } = req.body;

    const personagem = await Personagem.create({
      nome, origem, classe, nex, deslocamento, imagem_url,
      usuario_id: usuarioVerificado.id
    }, { transaction: t });

    await InformacoesPersonagem.create({
      personagem_id: personagem.id,
      pontos_vida, pontos_esforco, defesa, sanidade
    }, { transaction: t });

    await AtributosPersonagem.create({
      personagem_id: personagem.id,
      agilidade, inteligencia, presenca, forca, vigor
    }, { transaction: t });

    await PericiasPersonagem.create({
      personagem_id: personagem.id,
      diplomacia, enganacao, sobrevivencia, luta, tecnologia, intuicao
    }, { transaction: t });

    await t.commit();
    res.status(201).json({ id: personagem.id, message: 'Personagem criado com sucesso!' });
  } catch (error) {
    await t.rollback();
    if (error.message.includes('token')) {
      return res.status(401).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

exports.getAllPersonagens = async (req, res) => {
  try {
    const token = getTokenFromHeader(req);
    const usuarioVerificado = await AuthService.verificarToken(token);

        console.log('--- Iniciando getAllPersonagens ---');
    console.log('Usuário verificado pelo token:', usuarioVerificado);

    const whereClause = {};

    if (usuarioVerificado.role !== 'admin') {
      whereClause.usuario_id = usuarioVerificado.id;
    }
    console.log('Cláusula de busca (Where):', whereClause);

    const personagens = await Personagem.findAll({ where: whereClause });
    console.log('Personagens encontrados:', personagens.length);
    res.json(personagens);
  } catch (error) {
    if (error.message.includes('token')) {
      return res.status(401).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

exports.getPersonagemById = async (req, res) => {
  try {
    const token = getTokenFromHeader(req);
    const usuarioVerificado = await AuthService.verificarToken(token);

    const personagem = await Personagem.findByPk(req.params.id, {
      include: ['informacoes', 'atributos', 'pericias']
    });

    if (!personagem) {
      return res.status(404).json({ message: 'Personagem não encontrado' });
    }

    if (personagem.usuario_id !== usuarioVerificado.id && usuarioVerificado.role !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para ver este personagem.' });
    }

    res.json(personagem);
  } catch (error) {
    if (error.message.includes('token')) {
      return res.status(401).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

exports.updatePersonagem = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const token = getTokenFromHeader(req);
    const usuarioVerificado = await AuthService.verificarToken(token);
    const { id } = req.params;

    const personagemParaAtualizar = await Personagem.findByPk(id);
    if (!personagemParaAtualizar) {
      return res.status(404).json({ message: 'Personagem não encontrado' });
    }

    if (personagemParaAtualizar.usuario_id !== usuarioVerificado.id && usuarioVerificado.role !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para editar este personagem.' });
    }

    const { ...updateData } = req.body;

    await Personagem.update(updateData, { where: { id }, transaction: t });
    await InformacoesPersonagem.update(updateData, { where: { personagem_id: id }, transaction: t });
    await AtributosPersonagem.update(updateData, { where: { personagem_id: id }, transaction: t });
    await PericiasPersonagem.update(updateData, { where: { personagem_id: id }, transaction: t });

    await t.commit();
    res.json({ message: 'Personagem atualizado com sucesso!' });
  } catch (error) {
    await t.rollback();
    if (error.message.includes('token')) {
      return res.status(401).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

exports.deletePersonagem = async (req, res) => {
  try {
    const token = getTokenFromHeader(req);
    const usuarioVerificado = await AuthService.verificarToken(token);
    const { id } = req.params;

    const personagemParaDeletar = await Personagem.findByPk(id);
    if (!personagemParaDeletar) {
      return res.status(404).json({ message: 'Personagem não encontrado' });
    }

    if (personagemParaDeletar.usuario_id !== usuarioVerificado.id && usuarioVerificado.role !== 'admin') {
      return res.status(403).json({ message: 'Acesso negado. Você não tem permissão para deletar este personagem.' });
    }

    await Personagem.destroy({ where: { id } });

    res.json({ message: 'Personagem deletado com sucesso!' });
  } catch (error) {
    if (error.message.includes('token')) {
      return res.status(401).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};