// AddGarmentModal.jsx
// Modal for adding a new clothing item. Written by a student learning React!

import React, { useState } from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm.jsx';
import './AddGarmentModal.css';

function AddGarmentModal({ isOpen, onClose, onAddGarment }) {
  if (isOpen) {
    console.log('AddGarmentModal is rendering: isOpen =', isOpen);
  }
  // State for form fields
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [weather, setWeather] = useState('');

  // Check if form is valid
  const isFormValid = name.trim() && link.trim() && weather;

  // Handle form submit
  function handleSubmit(e) {
    e.preventDefault();
    if (!isFormValid) return;
    onAddGarment({ name, link, weather });
    setName('');
    setLink('');
    setWeather('');
    onClose();
  }

  return (
    <ModalWithForm
      title="Add Garment"
      name="add-garment"
      buttonText="Add Garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      {/* Name input */}
      <label className="modal__label" htmlFor="garment-name">Name of garment</label>
      <input
        className="modal__input"
        id="garment-name"
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="e.g. Jacket"
        required
      />
      {/* Image link input */}
      <label className="modal__label" htmlFor="garment-link">Image link</label>
      <input
        className="modal__input"
        id="garment-link"
        type="url"
        value={link}
        onChange={e => setLink(e.target.value)}
        placeholder="Paste image URL here"
        required
      />
      {/* Weather type select */}
      <div className="modal__label">Select the weather type:</div>
      <div className="modal__weather-options">
        {['hot', 'warm', 'cold'].map(type => (
          <div key={type} className="modal__weather-row">
            <button
              type="button"
              className={`modal__weather-btn${weather === type ? ' selected' : ''}`}
              onClick={() => setWeather(type)}
              aria-label={type}
            />
            <span className="modal__weather-text">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
          </div>
        ))}
      </div>
      {/* The submit button is rendered by ModalWithForm, but we can style it via CSS */}
      {/* It will be disabled if form is not valid */}
      <style>{`
        .modal__submit:disabled {
          background: #ccc;
          color: #888;
          cursor: not-allowed;
        }
      `}</style>
    </ModalWithForm>
  );
}

export default AddGarmentModal;
