function CampoPericia({ nome, label, value, onChange, min = 0, max, disabled = false }) {
  return (
    <div className="form-group">
      <label>{label}:</label>
      <input
        type="number"
        name={nome}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        disabled={disabled}
        className="pericia-input"
      />
    </div>
  );
}

export default CampoPericia;
