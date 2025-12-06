import React from 'react';
import ModalWithForm from '../../common/ModalWithForm/ModalWithForm.jsx';
import { useForm } from '../../../hooks/useForm.js';

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const { values, handleChange, resetForm } = useForm({
    name: '',
    imageUrl: '',
    weather: ''
  });

  const isValidImageLink = /^https?:\/\/.+\.(jpg|jpeg|png|gif|svg)$/.test(values.imageUrl?.trim() || '');
  const isFormValid = values.name?.trim() && isValidImageLink && values.weather;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    const newItem = {
      name: values.name,
      imageUrl: values.imageUrl,
      weather: values.weather,
    };
    
    onAddItem(newItem, resetForm);
  };

  const handleWeatherChange = (weatherType) => {
    handleChange({ 
      target: { 
        name: 'weather', 
        value: weatherType 
      } 
    });
  };

  return (
    <ModalWithForm
      title="New garment"
      name="add-item"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      disabled={!isFormValid}
    >
      <div className="modal__input-group">
        <label className="modal__label" htmlFor="item-name">Name</label>
        <input
          className="modal__input"
          id="item-name"
          name="name"
          type="text"
          value={values.name || ''}
          onChange={handleChange}
          placeholder="Name"
          required
        />
      </div>
      
      <div className="modal__input-group">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label className="modal__label" htmlFor="item-imageUrl">Image</label>
          {values.imageUrl && !isValidImageLink && (
            <span className="modal__error">(This is not a valid image link)</span>
          )}
        </div>
        <input
          className="modal__input"
          id="item-imageUrl"
          name="imageUrl"
          type="url"
          value={values.imageUrl || ''}
          onChange={handleChange}
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
                className={`modal__weather-btn${values.weather === type ? ' selected' : ''}`}
                onClick={() => handleWeatherChange(type)}
                aria-label={type}
              />
              <span className="modal__weather-text">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
            </div>
          ))}
        </div>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;