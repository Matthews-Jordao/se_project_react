import React from 'react';
import './ItemModal.css';

function ItemModal({ item, isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="item-modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>
        {/* Render item details here */}
        <div className="item-details">
          {item ? <pre>{JSON.stringify(item, null, 2)}</pre> : 'No item selected'}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
