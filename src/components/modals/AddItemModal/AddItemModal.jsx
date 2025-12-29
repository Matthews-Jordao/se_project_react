import React, { useState } from 'react';
import ModalWithForm from '../../common/ModalWithForm/ModalWithForm.jsx';
import { useForm } from '../../../hooks/useForm.js';

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const { values, handleChange, resetForm } = useForm({
    name: '',
    imageUrl: '',
    weather: '',
  });
  
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadMode, setUploadMode] = useState('url'); // 'url' or 'file'

  const isValidImageLink = /^https?:\/\/.+\.(jpg|jpeg|png|gif|svg)$/.test(
    values.imageUrl?.trim() || ''
  );
  
  // Form is valid if name and weather are provided, and either URL or file is selected
  const isFormValid = values.name?.trim() && 
    values.weather && 
    (selectedFile || (uploadMode === 'url' && isValidImageLink));

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    // Clear URL when file is selected
    if (file) {
      handleChange({
        target: {
          name: 'imageUrl',
          value: '',
        },
      });
    }
  };

  const handleUrlChange = (e) => {
    // Clear selected file when typing URL
    if (e.target.value && selectedFile) {
      setSelectedFile(null);
    }
    handleChange(e);
  };

  const switchToFileMode = () => {
    setUploadMode('file');
    setSelectedFile(null);
    handleChange({
      target: {
        name: 'imageUrl',
        value: '',
      },
    });
  };

  const switchToUrlMode = () => {
    setUploadMode('url');
    setSelectedFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('weather', values.weather);
    
    if (selectedFile) {
      formData.append('image', selectedFile);
    } else {
      formData.append('imageUrl', values.imageUrl);
    }

    onAddItem(formData, resetForm, () => {
      setSelectedFile(null);
      setUploadMode('url');
    });
  };

  const handleWeatherChange = (weatherType) => {
    handleChange({
      target: {
        name: 'weather',
        value: weatherType,
      },
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
        <label className="modal__label" htmlFor="item-name">
          Name
        </label>
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
        <label className="modal__label" htmlFor="item-imageUrl">
          Image
        </label>
        
        {uploadMode === 'url' ? (
          <div className="modal__image-input-wrapper">
            <input
              className={`modal__input modal__input--with-button ${values.imageUrl && !isValidImageLink ? 'modal__input--error' : ''}`}
              id="item-imageUrl"
              name="imageUrl"
              type="url"
              value={values.imageUrl || ''}
              onChange={handleUrlChange}
              placeholder="Image URL"
            />
            <button
              type="button"
              className="modal__upload-switch-btn"
              onClick={switchToFileMode}
              title="Upload image file instead"
            >
              Upload image
            </button>
          </div>
        ) : (
          <div className="modal__file-input-wrapper">
            <input
              type="file"
              id="item-image-file"
              accept="image/*"
              onChange={handleFileChange}
              className="modal__file-input"
            />
            <label htmlFor="item-image-file" className="modal__file-input-label">
              {selectedFile ? selectedFile.name : 'Choose image file'}
            </label>
            <button
              type="button"
              className="modal__url-switch-link"
              onClick={switchToUrlMode}
            >
              Use URL instead
            </button>
          </div>
        )}
        
        {values.imageUrl && !isValidImageLink && uploadMode === 'url' && (
          <span className="modal__error">
            This is not a valid image link
          </span>
        )}
        {selectedFile && uploadMode === 'file' && (
          <div className="modal__file-selected">
            Selected: {selectedFile.name}
          </div>
        )}
      </div>

      <div className="modal__weather-group">
        <div className="modal__label">Select the weather type:</div>
        <div className="modal__weather-options">
          {['hot', 'warm', 'cold'].map((type) => (
            <div key={type} className="modal__weather-row">
              <button
                type="button"
                className={`modal__weather-btn${values.weather === type ? ' selected' : ''}`}
                onClick={() => handleWeatherChange(type)}
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
};

export default AddItemModal;
