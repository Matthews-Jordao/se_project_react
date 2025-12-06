import React, { useContext } from 'react';
import './ItemModal.css';
import CurrentUserContext from '../../../contexts/CurrentUserContext.js';

function ItemModal({ item, isOpen, onClose, onDelete }) {
  const currentUser = useContext(CurrentUserContext);
  if (!isOpen) return null;

  const isOwn = item?.owner === currentUser?._id;

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
    <div
      className="item-modal"
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
    >
      <div className="item-modal__content">
        <button
          className="close-btn"
          onClick={onClose}
          aria-label="Close"
        ></button>
        <div className="item-details">
          {item ? (
            <>
              <img
                src={item.link || item.imageUrl}
                alt={item.name}
                className="item-details__image"
              />
              <div className="item-details__info">
                <div className="item-details__name-row">
                  <h3 className="item-details__name">{item.name}</h3>
                  {isOwn && (
                    <button
                      className="item-details__delete-btn"
                      onClick={handleDelete}
                      aria-label="Delete item"
                    >
                      Delete item
                    </button>
                  )}
                </div>
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
