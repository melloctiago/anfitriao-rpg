import React from 'react';
import './SliderInput.css';

function SliderInput({ label, name, value, onChange, min = 0, max = 100, step = 1, unit = '' }) {
  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    onChange({
      target: {
        name: name,
        value: newValue
      }
    });
  };

  return (
    <div className="slider-input-container">
      <label>
        {label}:{' '}
        <span className="value-display">
          {value}
          {unit}
        </span>
      </label>

      <div className="slider-input-group">
        <input
          type="range"
          name={name}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="slider"
        />

        <input
          type="number"
          name={name}
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="number-input"
        />
      </div>
    </div>
  );
}

export default SliderInput;
