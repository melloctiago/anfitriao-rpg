const db = require('../config/db');

class Atributos {
  static async create({ personagem_id, agilidade, inteligencia, presenca, forca, vigor }) {
    await db.execute(
      'INSERT INTO atributos_personagem (personagem_id, agilidade, inteligencia, presenca, forca, vigor) VALUES (?, ?, ?, ?, ?, ?)',
      [personagem_id, agilidade, inteligencia, presenca, forca, vigor]
    );
  }

  static async findByPersonagemId(personagem_id) {
    const [rows] = await db.execute('SELECT * FROM atributos_personagem WHERE personagem_id = ?', [personagem_id]);
    return rows[0];
  }

  static async update(personagem_id, { agilidade, inteligencia, presenca, forca, vigor }) {
    await db.execute(
      'UPDATE atributos_personagem SET agilidade = ?, inteligencia = ?, presenca = ?, forca = ?, vigor = ? WHERE personagem_id = ?',
      [agilidade, inteligencia, presenca, forca, vigor, personagem_id]
    );
  }
}

module.exports = Atributos;