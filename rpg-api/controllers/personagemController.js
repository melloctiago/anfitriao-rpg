const Personagem = require('../models/Personagem');
const Informacoes = require('../models/InformacoesPersonagem');
const Atributos = require('../models/AtributosPersonagem');
const Pericias = require('../models/PericiasPersonagem');

// Criar personagem com todos os dados
exports.createPersonagem = async (req, res) => {
  try {
    const {
      nome, origem, classe, nex, deslocamento,
      pontos_vida, pontos_esforco, defesa, sanidade,
      agilidade, inteligencia, presenca, forca, vigor,
      diplomacia, enganacao, sobrevivencia, luta, tecnologia, intuicao
    } = req.body;

    const personagem = await Personagem.create({ nome, origem, classe, nex, deslocamento });

    await Informacoes.create({ personagem_id: personagem.id, pontos_vida, pontos_esforco, defesa, sanidade });
    await Atributos.create({ personagem_id: personagem.id, agilidade, inteligencia, presenca, forca, vigor });
    await Pericias.create({
      personagem_id: personagem.id,
      diplomacia, enganacao, sobrevivencia, luta, tecnologia, intuicao
    });

    res.status(201).json({ id: personagem.id, message: 'Personagem criado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Buscar todos os personagens
exports.getAllPersonagens = async (req, res) => {
  try {
    const personagens = await Personagem.findAll();
    res.json(personagens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Buscar personagem com informações completas
exports.getPersonagemById = async (req, res) => {
  try {
    const personagem = await Personagem.findByPk(req.params.id, {
      include: [Informacoes, Atributos, Pericias]
    });

    if (!personagem) {
      return res.status(404).json({ message: 'Personagem não encontrado' });
    }

    res.json(personagem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Atualizar personagem e dependentes
exports.updatePersonagem = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nome, origem, classe, nex, deslocamento,
      pontos_vida, pontos_esforco, defesa, sanidade,
      agilidade, inteligencia, presenca, forca, vigor,
      diplomacia, enganacao, sobrevivencia, luta, tecnologia, intuicao
    } = req.body;

    await Personagem.update({ nome, origem, classe, nex, deslocamento }, { where: { id } });
    await Informacoes.update({ pontos_vida, pontos_esforco, defesa, sanidade }, { where: { personagem_id: id } });
    await Atributos.update({ agilidade, inteligencia, presenca, forca, vigor }, { where: { personagem_id: id } });
    await Pericias.update({ diplomacia, enganacao, sobrevivencia, luta, tecnologia, intuicao }, { where: { personagem_id: id } });

    res.json({ message: 'Personagem atualizado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Deletar personagem e dependentes
exports.deletePersonagem = async (req, res) => {
  try {
    const { id } = req.params;

    await Informacoes.destroy({ where: { personagem_id: id } });
    await Atributos.destroy({ where: { personagem_id: id } });
    await Pericias.destroy({ where: { personagem_id: id } });
    await Personagem.destroy({ where: { id } });

    res.json({ message: 'Personagem deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
