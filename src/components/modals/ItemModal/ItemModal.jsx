import React from 'react';
import './ItemModal.css';

function ItemModal({ item, isOpen, onClose, onDelete }) {
  if (!isOpen) return null;
  
  function handleOverlayClick(e) {
    if (e.target.classList.contains('item-modal')) {
      onClose();
    }
  }

  const handleDelete = () => {
    if (item && onDelete) {
      onDelete(item);
    }
  };

  return (
    <div className="item-modal" onClick={handleOverlayClick} aria-modal="true" role="dialog">
      <div className="item-modal__content">
        <button className="close-btn" onClick={onClose} aria-label="Close"></button>
        <div className="item-details">
          {item ? (
            <>
              <img
                src={item.link || item.imageUrl}
                alt={item.name}
                className="item-details__image"
              />
              <div className="item-details__info">
                <h3 className="item-details__name">{item.name}</h3>
                <p className="item-details__weather">
                  Weather: {item.weather || 'unknown'}
                </p>
                <button 
                  className="item-details__delete-btn" 
                  onClick={handleDelete}
                  aria-label="Delete item"
                >
                  Delete item
                </button>
              </div>
            </>
          ) : (
            'No item selected'
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
