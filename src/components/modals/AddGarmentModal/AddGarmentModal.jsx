
import React, { useState } from 'react';
import ModalWithForm from '../../common/ModalWithForm/ModalWithForm.jsx';
import './AddGarmentModal.css';

function AddGarmentModal({ isOpen, onClose, onAddGarment }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [weather, setWeather] = useState('');

  const isValidImageLink = /^https?:\/\/.+\.(jpg|jpeg|png|gif|svg)$/.test(link.trim());
  const isFormValid = name.trim() && isValidImageLink && weather;

  function handleSubmit(e) {
    e.preventDefault();
    if (!isFormValid) return;
    
    const newGarment = {
      _id: Date.now().toString(),
      name,
      link,
      weather,
    };
    
    onAddGarment(newGarment);
    setName('');
    setLink('');
    setWeather('');
    onClose();
  }

  return (
    <ModalWithForm
      title="New Garment"
      name="add-garment"
      buttonText="Add Garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      disabled={!isFormValid}
    >
      <div className="modal__input-group">
        <label className="modal__label" htmlFor="garment-name">Name</label>
        <input
          className="modal__input"
          id="garment-name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Name"
          required
        />
      </div>
      
      <div className="modal__input-group">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label className="modal__label" htmlFor="garment-link">Image</label>
          {link && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|svg)$/.test(link.trim()) && (
            <span className="modal__error">(This is not a valid image link)</span>
          )}
        </div>
        <input
          className="modal__input"
          id="garment-link"
          type="url"
          value={link}
          onChange={e => setLink(e.target.value)}
          placeholder="Image URL"
          required
        />
      </div>
      
      <div className="modal__weather-group">
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
              <span className="modal__weather-text">
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </ModalWithForm>
  );
}

export default AddGarmentModal;
