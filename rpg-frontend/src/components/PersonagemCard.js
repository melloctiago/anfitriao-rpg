import React from 'react';

function PersonagemCard({ personagem, onDelete, onEdit, onVisualize }) {

  const backendUrl = 'http://localhost:3000';

  return (
    <div className="personagem-card">

      {personagem.imagem_url && (
        <div className="card-image-container">
          <img
            src={`${backendUrl}/uploads/${personagem.imagem_url}`}
            alt={`Foto de ${personagem.nome}`}
            style={{
              width: '100%',
              height: '180px',
              objectFit: 'cover',
              borderRadius: '8px 8px 0 0'
            }}
          />
        </div>
      )}

      <div className="card-content">
        <h3>{personagem.nome}</h3>
        <p>
          <strong>Classe:</strong> {personagem.classe}
        </p>
        <p>
          <strong>NEX:</strong> {personagem.nex}%
        </p>

        <div className="card-actions">
          <button onClick={() => onEdit(personagem.id)}>Editar</button>
          <button onClick={() => onVisualize(personagem.id)}>Ver</button>
          <button onClick={() => onDelete(personagem.id)}>Excluir</button>
        </div>
      </div>
    </div>
  );
}

export default PersonagemCard;