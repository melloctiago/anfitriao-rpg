const Personagem = require('../models/personagem');
const Informacoes = require('../models/informacoes');
const Atributos = require('../models/atributos');
const Pericias = require('../models/pericias');

exports.createPersonagem = async (req, res) => {
  try {
    const { 
      // Dados do personagem
      nome, origem, classe, nex, deslocamento,
      // Informações
      pontos_vida, pontos_esforco, defesa, sanidade,
      // Atributos
      agilidade, inteligencia, presenca, forca, vigor,
      // Perícias
      diplomacia, enganacao, sobrevivencia, luta, tecnologia, intuicao
    } = req.body;

    // Criar personagem principal
    const personagemId = await Personagem.create({ nome, origem, classe, nex, deslocamento });

    // Criar informações relacionadas
    await Informacoes.create({ personagem_id: personagemId, pontos_vida, pontos_esforco, defesa, sanidade });

    // Criar atributos relacionados
    await Atributos.create({ personagem_id: personagemId, agilidade, inteligencia, presenca, forca, vigor });

    // Criar perícias relacionadas
    await Pericias.create({ 
      personagem_id: personagemId, 
      diplomacia, enganacao, sobrevivencia, luta, tecnologia, intuicao 
    });

    res.status(201).json({ id: personagemId, message: 'Personagem criado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllPersonagens = async (req, res) => {
  try {
    const personagens = await Personagem.findAll();
    res.json(personagens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPersonagemById = async (req, res) => {
  try {
    const personagem = await Personagem.findById(req.params.id);
    if (!personagem) {
      return res.status(404).json({ message: 'Personagem não encontrado' });
    }

    const informacoes = await Informacoes.findByPersonagemId(req.params.id);
    const atributos = await Atributos.findByPersonagemId(req.params.id);
    const pericias = await Pericias.findByPersonagemId(req.params.id);

    res.json({
      ...personagem,
      informacoes,
      atributos,
      pericias
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePersonagem = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      nome, origem, classe, nex, deslocamento,
      pontos_vida, pontos_esforco, defesa, sanidade,
      agilidade, inteligencia, presenca, forca, vigor,
      diplomacia, enganacao, sobrevivencia, luta, tecnologia, intuicao
    } = req.body;

    // Atualizar personagem principal
    await Personagem.update(id, { nome, origem, classe, nex, deslocamento });

    // Atualizar informações
    await Informacoes.update(id, { pontos_vida, pontos_esforco, defesa, sanidade });

    // Atualizar atributos
    await Atributos.update(id, { agilidade, inteligencia, presenca, forca, vigor });

    // Atualizar perícias
    await Pericias.update(id, { 
      diplomacia, enganacao, sobrevivencia, luta, tecnologia, intuicao 
    });

    res.json({ message: 'Personagem atualizado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deletePersonagem = async (req, res) => {
  try {
    await Personagem.delete(req.params.id);
    res.json({ message: 'Personagem deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};