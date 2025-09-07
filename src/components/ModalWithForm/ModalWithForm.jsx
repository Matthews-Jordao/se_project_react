import React from 'react';
import './ModalWithForm.css';

function ModalWithForm({ children, isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="modal-with-form">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}

export default ModalWithForm;
