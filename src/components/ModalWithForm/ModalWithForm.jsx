import React, { useEffect } from 'react';
import './ModalWithForm.css';

function ModalWithForm({
  children,
  isOpen,
  onClose,
  title = '',
  name = '',
  buttonText = 'Submit',
  disabled = false,
  onSubmit,
}) {
  // ModalWithForm.jsx
  // This component wraps any form in a modal, and supports multiple forms by using props for title, name, and button text.
  // Written by a student learning React!

    // Close modal on Escape key
    useEffect(() => {
      function handleEsc(e) {
        if (e.key === 'Escape') onClose();
      }
      if (isOpen) {
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
      }
    }, [isOpen, onClose]);

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
        <button className="modal__close" type="button" aria-label="Close" onClick={onClose}>
          &#10005;
        </button>
        <h2 className="modal__title">{title}</h2>
        <form className="modal__form" name={name} onSubmit={onSubmit}>
          {children}
          <button className="modal__submit" type="submit" disabled={disabled}>{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

  export default ModalWithForm;

