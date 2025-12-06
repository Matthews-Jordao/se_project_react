import React from 'react';
import ModalWithForm from '../../common/ModalWithForm/ModalWithForm.jsx';
import { useForm } from '../../../hooks/useForm.js';

const LoginModal = ({ isOpen, onLogin, onCloseModal, onRegisterClick }) => {
  const { values, handleChange, resetForm } = useForm({
    email: '',
    password: ''
  });

  const isFormValid = values.email?.trim() && values.password?.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    onLogin({
      email: values.email,
      password: values.password
    }, resetForm);
  };

  const footerContent = (
    <div className="modal__redirect">
      <button
        type="submit"
        className="modal__submit"
        disabled={!isFormValid}
      >
        Log in
      </button>
      <button
        type="button" 
        className="modal__redirect-btn"
        onClick={onRegisterClick}
      >
        or Sign up
      </button>
    </div>
  );

  return (
    <ModalWithForm
      title="Log in"
      name="login"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      footerContent={footerContent}
    >
      <div className="modal__input-group">
        <label className="modal__label" htmlFor="login-email">Email*</label>
        <input
          className="modal__input"
          id="login-email"
          name="email"
          type="email"
          value={values.email || ''}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </div>
      
      <div className="modal__input-group">
        <label className="modal__label" htmlFor="login-password">Password*</label>
        <input
          className="modal__input"
          id="login-password"
          name="password"
          type="password"
          value={values.password || ''}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
