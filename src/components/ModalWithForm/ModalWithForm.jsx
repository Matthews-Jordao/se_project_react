import React from 'react';
import './ModalWithForm.css';

function ModalWithForm({
  children,
  isOpen,
  onClose,
  title = '',
  name = '',
  buttonText = 'Submit',
}) {
  if (!isOpen) return null;

  // Close modal if overlay is clicked
  function handleOverlayClick(e) {
    if (e.target.classList.contains('modal')) {
      onClose();
    }
  }

  return (
    <div
      className={`modal modal_type_${name} ${isOpen ? 'modal_is-opened' : ''}`}
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
    >
      <div className="modal__content">
        <button className="modal__close-btn" onClick={onClose} type="button">×</button>
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" name={name}>
          {children}
          <button className="modal__submit-btn" type="submit">{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
