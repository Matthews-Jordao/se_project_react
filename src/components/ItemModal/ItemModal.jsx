import React from 'react';
import './ItemModal.css';

function ItemModal({ item, isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="item-modal">
      <div className="modal-content">
  <button className="close-btn" onClick={onClose} aria-label="Close"></button>
        <div className="item-details">
          {item ? (
            <>
              <img
                src={item.link}
                alt={item.name}
                className="item-details__image"
              />
              <div className="item-details__info">
                <h3 className="item-details__name">{item.name}</h3>
                <p className="item-details__weather">
                  Weather: {item.weather || 'unknown'}
                </p>
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
