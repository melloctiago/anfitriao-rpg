const db = require('../config/db');

class Personagem {
  static async create({ nome, origem, classe, nex, deslocamento }) {
    const [result] = await db.execute(
      'INSERT INTO personagem (nome, origem, classe, nex, deslocamento) VALUES (?, ?, ?, ?, ?)',
      [nome, origem, classe, nex, deslocamento]
    );
    return result.insertId;
  }

  static async findAll() {
    const [rows] = await db.execute('SELECT * FROM personagem');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute('SELECT * FROM personagem WHERE id = ?', [id]);
    return rows[0];
  }

  static async update(id, { nome, origem, classe, nex, deslocamento }) {
    await db.execute(
      'UPDATE personagem SET nome = ?, origem = ?, classe = ?, nex = ?, deslocamento = ? WHERE id = ?',
      [nome, origem, classe, nex, deslocamento, id]
    );
  }

  static async delete(id) {
    await db.execute('DELETE FROM personagem WHERE id = ?', [id]);
  }
}

module.exports = Personagem;