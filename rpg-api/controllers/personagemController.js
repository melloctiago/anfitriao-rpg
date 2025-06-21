const Personagem = require('../models/Personagem');
const InformacoesPersonagem = require('../models/InformacoesPersonagem');
const AtributosPersonagem = require('../models/AtributosPersonagem');
const PericiasPersonagem = require('../models/PericiasPersonagem');

// Criar personagem com todos os dados
exports.createPersonagem = async (req, res) => {
  try {
    const {
      nome,
      origem,
      classe,
      nex,
      deslocamento,
      pontos_vida,
      pontos_esforco,
      defesa,
      sanidade,
      agilidade,
      inteligencia,
      presenca,
      forca,
      vigor,
      diplomacia,
      enganacao,
      sobrevivencia,
      luta,
      tecnologia,
      intuicao
    } = req.body;

    const personagem = await Personagem.create({ nome, origem, classe, nex, deslocamento });

    await InformacoesPersonagem.create({
      personagem_id: personagem.id,
      pontos_vida,
      pontos_esforco,
      defesa,
      sanidade
    });
    await AtributosPersonagem.create({
      personagem_id: personagem.id,
      agilidade,
      inteligencia,
      presenca,
      forca,
      vigor
    });
    await PericiasPersonagem.create({
      personagem_id: personagem.id,
      diplomacia,
      enganacao,
      sobrevivencia,
      luta,
      tecnologia,
      intuicao
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
      include: [InformacoesPersonagem, AtributosPersonagem, PericiasPersonagem]
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
      nome,
      origem,
      classe,
      nex,
      deslocamento,
      pontos_vida,
      pontos_esforco,
      defesa,
      sanidade,
      agilidade,
      inteligencia,
      presenca,
      forca,
      vigor,
      diplomacia,
      enganacao,
      sobrevivencia,
      luta,
      tecnologia,
      intuicao
    } = req.body;

    await Personagem.update({ nome, origem, classe, nex, deslocamento }, { where: { id } });
    await InformacoesPersonagem.update(
      { pontos_vida, pontos_esforco, defesa, sanidade },
      { where: { personagem_id: id } }
    );
    await AtributosPersonagem.update(
      { agilidade, inteligencia, presenca, forca, vigor },
      { where: { personagem_id: id } }
    );
    await PericiasPersonagem.update(
      { diplomacia, enganacao, sobrevivencia, luta, tecnologia, intuicao },
      { where: { personagem_id: id } }
    );

    res.json({ message: 'Personagem atualizado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Deletar personagem e dependentes
exports.deletePersonagem = async (req, res) => {
  try {
    const { id } = req.params;

    await InformacoesPersonagem.destroy({ where: { personagem_id: id } });
    await AtributosPersonagem.destroy({ where: { personagem_id: id } });
    await PericiasPersonagem.destroy({ where: { personagem_id: id } });
    await Personagem.destroy({ where: { id } });

    res.json({ message: 'Personagem deletado com sucesso!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
