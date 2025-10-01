import React from 'react';
import './DeleteConfirmationModal.css';

function DeleteConfirmationModal({ isOpen, onClose, onConfirm, itemName }) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('delete-modal')) {
      onClose();
    }
  };

  return (
    <div className="delete-modal" onClick={handleOverlayClick} aria-modal="true" role="dialog">
      <div className="delete-modal__content">
        <button className="delete-modal__close-btn" onClick={onClose} aria-label="Close"></button>
        <div className="delete-modal__body">
          <h3 className="delete-modal__title">
            Are you sure you want to delete this item?
          </h3>
          <p className="delete-modal__text">
            This action is irreversible.
          </p>
          <div className="delete-modal__buttons">
            <button 
              className="delete-modal__confirm-btn" 
              onClick={onConfirm}
            >
              Yes, delete item
            </button>
            <button 
              className="delete-modal__cancel-btn" 
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;