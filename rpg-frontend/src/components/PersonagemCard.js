import React from 'react';

function PersonagemCard({ personagem, onDelete, onEdit }) {
  return (
    <div className="personagem-card">
      <h3>{personagem.nome}</h3>
      <p>
        <strong>Classe:</strong> {personagem.classe}
      </p>
      <p>
        <strong>NEX:</strong> {personagem.nex}%
      </p>

      <div className="card-actions">
        <button onClick={() => onEdit(personagem.id)}>Editar</button>
        <button onClick={() => onDelete(personagem.id)}>Excluir</button>
      </div>
    </div>
  );
}

export default PersonagemCard;
