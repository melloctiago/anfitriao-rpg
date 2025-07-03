import React, { useState, useEffect } from 'react';
import CampoPericia from './CampoPericia';
import SliderInput from './SliderInput';
import ImageUpload from './ImageUpload'; // NOVO: Importação do componente de upload

function PersonagemForm({ personagem, onSubmit, isEditing }) {
  const [formData, setFormData] = useState({
    nome: '',
    origem: '',
    classe: '',
    imagem_url: '', // NOVO: Campo para armazenar o nome/caminho da imagem
    nex: 0,
    deslocamento: 0,
    pontos_vida: 0,
    pontos_esforco: 0,
    defesa: 0,
    sanidade: 0,
    agilidade: 0,
    inteligencia: 0,
    presenca: 0,
    forca: 0,
    vigor: 0,
    diplomacia: 0,
    enganacao: 0,
    sobrevivencia: 0,
    luta: 0,
    tecnologia: 0,
    intuicao: 0
  });

  const opcoesClasse = [
    { valor: '', label: 'Selecione uma classe' },
    { valor: 'Combatente', label: 'Combatente' },
    { valor: 'Ocultista', label: 'Ocultista' },
    { valor: 'Especialista', label: 'Especialista' }
  ];

  const opcoesOrigens = [
    { valor: '', label: 'Selecione uma origem' },
    { valor: 'Artista', label: 'Artista' },
    { valor: 'Acadêmico', label: 'Acadêmico' },
    { valor: 'T.I.', label: 'T.I.' },
    { valor: 'Religioso', label: 'Religioso' }
  ];

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (personagem) {
      setFormData({
        nome: personagem.nome,
        origem: personagem.origem,
        classe: personagem.classe,
        // NOVO: Popula a imagem_url se o personagem já tiver uma.
        // Assumi que a propriedade se chama 'imagem_url' no seu objeto 'personagem'.
        // Se o nome for diferente, ajuste aqui.
        imagem_url: personagem.imagem_url || '',
        nex: personagem.nex,
        deslocamento: personagem.deslocamento,
        pontos_vida: personagem.informacoes.pontos_vida,
        pontos_esforco: personagem.informacoes.pontos_esforco,
        defesa: personagem.informacoes.defesa,
        sanidade: personagem.informacoes.sanidade,
        agilidade: personagem.atributos.agilidade,
        inteligencia: personagem.atributos.inteligencia,
        presenca: personagem.atributos.presenca,
        forca: personagem.atributos.forca,
        vigor: personagem.atributos.vigor,
        diplomacia: personagem.pericias?.diplomacia || 0,
        enganacao: personagem.pericias?.enganacao || 0,
        sobrevivencia: personagem.pericias?.sobrevivencia || 0,
        luta: personagem.pericias?.luta || 0,
        tecnologia: personagem.pericias?.tecnologia || 0,
        intuicao: personagem.pericias?.intuicao || 0
      });
    }
  }, [personagem]);

  // NOVO: Função para lidar com o sucesso do upload
  const handleUploadSuccess = (fileData) => {
    setFormData({
      ...formData,
      imagem_url: fileData.filename // Armazena apenas o nome do arquivo no estado do formulário
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validate = () => {
    // Nenhuma alteração aqui
    const newErrors = {};
    const requiredFields = [
      'nome', 'origem', 'classe', 'nex', 'deslocamento',
      'pontos_vida', 'pontos_esforco', 'defesa', 'sanidade',
      'agilidade', 'inteligencia', 'presenca', 'forca', 'vigor'
    ];
    requiredFields.forEach((field) => {
      if (!formData[field]) { newErrors[field] = 'Este campo é obrigatório'; }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Nenhuma alteração aqui. A 'imagem_url' já está no formData e será enviada.
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="personagem-form">
      <h2>{isEditing ? 'Editar Personagem' : 'Criar Personagem'}</h2>

      <div className="form-section">
        <h3>Informações Básicas</h3>

        {/* NOVO: Seção para upload e prévia da imagem */}
        <div className="form-group">
          <label>Imagem do Personagem:</label>
          <ImageUpload onUploadSuccess={handleUploadSuccess} />
          {formData.imagem_url && (
            <div className="image-preview" style={{ marginTop: '10px' }}>
              <p>Prévia:</p>
              <img
                src={`http://localhost:3001/uploads/${formData.imagem_url}`}
                alt="Prévia do personagem"
                style={{ maxWidth: '150px', borderRadius: '8px' }}
              />
            </div>
          )}
        </div>

        <div className="form-group">
          <label>Nome:</label>
          <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
          {errors.nome && <span className="error">{errors.nome}</span>}
        </div>
        <div className="form-group">
          <label>Origem:</label>
          <select name="origem" value={formData.origem} onChange={handleChange} required>
            {opcoesOrigens.map((opcao) => (
              <option key={opcao.valor} value={opcao.valor} disabled={opcao.valor === ''}>
                {opcao.label}
              </option>
            ))}
          </select>
          {errors.origem && <span className="error">{errors.origem}</span>}
        </div>
        <div className="form-group">
          <label>Classe:</label>
          <select name="classe" value={formData.classe} onChange={handleChange} required>
            {opcoesClasse.map((opcao) => (
              <option key={opcao.valor} value={opcao.valor} disabled={opcao.valor === ''}>
                {opcao.label}
              </option>
            ))}
          </select>
          {errors.classe && <span className="error">{errors.classe}</span>}
        </div>

        <div className="form-group">
          <label>Deslocamento:</label>
          <input
            type="number"
            name="deslocamento"
            value={formData.deslocamento}
            onChange={handleChange}
            min="0"
          />
          {errors.deslocamento && <span className="error">{errors.deslocamento}</span>}
        </div>

        <div className="form-group">
          <label>Defesa:</label>
          <input
            type="number"
            name="defesa"
            value={formData.defesa}
            onChange={handleChange}
            min="0"
          />
          {errors.defesa && <span className="error">{errors.defesa}</span>}
        </div>
      </div>

      {/* Nenhuma alteração necessária no restante do formulário */}
      <SliderInput
        label="NEX"
        name="nex"
        value={formData.nex}
        onChange={handleChange}
        min={5}
        max={95}
        step={5}
        unit="%"
      />

      <SliderInput
        label="Pontos de Vida"
        name="pontos_vida"
        value={formData.pontos_vida}
        onChange={handleChange}
        min={1}
        max={99}
      />

      <SliderInput
        label="Pontos de Esforço"
        name="pontos_esforco"
        value={formData.pontos_esforco}
        onChange={handleChange}
        min={1}
        max={20}
      />

      <SliderInput
        label="Sanidade"
        name="sanidade"
        value={formData.sanidade}
        onChange={handleChange}
        min={0}
        max={99}
      />

      <div className="form-section">
        <h3>Atributos</h3>
        <div className="form-group">
          <label>Agilidade:</label>
          <input
            type="number"
            name="agilidade"
            value={formData.agilidade}
            onChange={handleChange}
            min="0"
          />
          {errors.agilidade && <span className="error">{errors.agilidade}</span>}
        </div>
        <div className="form-group">
          <label>Inteligência:</label>
          <input
            type="number"
            name="inteligencia"
            value={formData.inteligencia}
            onChange={handleChange}
            min="0"
          />
          {errors.inteligencia && <span className="error">{errors.inteligencia}</span>}
        </div>
        <div className="form-group">
          <label>Vigor:</label>
          <input
            type="number"
            name="vigor"
            value={formData.vigor}
            onChange={handleChange}
            min="0"
          />
          {errors.vigor && <span className="error">{errors.vigor}</span>}
        </div>
        <div className="form-group">
          <label>Presença:</label>
          <input
            type="number"
            name="presenca"
            value={formData.presenca}
            onChange={handleChange}
            min="0"
          />
          {errors.presenca && <span className="error">{errors.presenca}</span>}
        </div>
        <div className="form-group">
          <label>Força:</label>
          <input
            type="number"
            name="forca"
            value={formData.forca}
            onChange={handleChange}
            min="0"
          />
          {errors.forca && <span className="error">{errors.forca}</span>}
        </div>
      </div>

      <div className="form-section">
        <h3>Perícias</h3>

        <CampoPericia
          nome="diplomacia"
          label="Diplomacia"
          value={formData.diplomacia}
          onChange={handleChange}
        />

        <CampoPericia
          nome="enganacao"
          label="Enganação"
          value={formData.enganacao}
          onChange={handleChange}
        />

        <CampoPericia
          nome="sobrevivencia"
          label="Sobrevivência"
          value={formData.sobrevivencia}
          onChange={handleChange}
        />

        <CampoPericia nome="luta" label="Luta" value={formData.luta} onChange={handleChange} />

        <CampoPericia
          nome="tecnologia"
          label="Tecnologia"
          value={formData.tecnologia}
          onChange={handleChange}
        />

        <CampoPericia
          nome="intuicao"
          label="Intuição"
          value={formData.intuicao}
          onChange={handleChange}
        />
      </div>


      <button type="submit" className="submit-btn">
        {isEditing ? 'Atualizar Personagem' : 'Criar Personagem'}
      </button>
    </form>
  );
}

export default PersonagemForm;