const db = require('../config/db');

class Pericias {
  static async create({ personagem_id, diplomacia, enganacao, sobrevivencia, luta, tecnologia, intuicao }) {
    await db.execute(
      'INSERT INTO pericias_personagem (personagem_id, diplomacia, enganacao, sobrevivencia, luta, tecnologia, intuicao) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [personagem_id, diplomacia, enganacao, sobrevivencia, luta, tecnologia, intuicao]
    );
  }

  static async findByPersonagemId(personagem_id) {
    const [rows] = await db.execute('SELECT * FROM pericias_personagem WHERE personagem_id = ?', [personagem_id]);
    return rows[0];
  }

  static async update(personagem_id, { diplomacia, enganacao, sobrevivencia, luta, tecnologia, intuicao }) {
    await db.execute(
      'UPDATE pericias_personagem SET diplomacia = ?, enganacao = ?, sobrevivencia = ?, luta = ?, tecnologia = ?, intuicao = ? WHERE personagem_id = ?',
      [diplomacia, enganacao, sobrevivencia, luta, tecnologia, intuicao, personagem_id]
    );
  }
}

module.exports = Pericias;