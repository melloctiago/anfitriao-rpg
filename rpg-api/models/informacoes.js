const db = require('../config/db');

class Informacoes {
  static async create({ personagem_id, pontos_vida, pontos_esforco, defesa, sanidade }) {
    await db.execute(
      'INSERT INTO informacoes_personagem (personagem_id, pontos_vida, pontos_esforco, defesa, sanidade) VALUES (?, ?, ?, ?, ?)',
      [personagem_id, pontos_vida, pontos_esforco, defesa, sanidade]
    );
  }

  static async findByPersonagemId(personagem_id) {
    const [rows] = await db.execute('SELECT * FROM informacoes_personagem WHERE personagem_id = ?', [personagem_id]);
    return rows[0];
  }

  static async update(personagem_id, { pontos_vida, pontos_esforco, defesa, sanidade }) {
    await db.execute(
      'UPDATE informacoes_personagem SET pontos_vida = ?, pontos_esforco = ?, defesa = ?, sanidade = ? WHERE personagem_id = ?',
      [pontos_vida, pontos_esforco, defesa, sanidade, personagem_id]
    );
  }
}

module.exports = Informacoes;