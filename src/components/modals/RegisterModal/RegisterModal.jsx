import React from 'react';
import ModalWithForm from '../../common/ModalWithForm/ModalWithForm.jsx';
import { useForm } from '../../../hooks/useForm.js';

const RegisterModal = ({ isOpen, onRegister, onCloseModal, onLoginClick }) => {
  const { values, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    name: '',
    avatar: ''
  });

  const isFormValid = values.email?.trim() && 
                      values.password?.trim() && 
                      values.name?.trim() && 
                      values.avatar?.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    onRegister({
      email: values.email,
      password: values.password,
      name: values.name,
      avatar: values.avatar
    }, resetForm);
  };

  const footerContent = (
    <div className="modal__redirect">
      <button
        type="submit"
        className="modal__submit"
        disabled={!isFormValid}
      >
        Sign up
      </button>
      <button
        type="button"
        className="modal__redirect-btn"
        onClick={onLoginClick}
      >
        or Log in
      </button>
    </div>
  );

  return (
    <ModalWithForm
      title="Sign up"
      name="register"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      footerContent={footerContent}
    >
      <div className="modal__input-group">
        <label className="modal__label" htmlFor="register-email">Email*</label>
        <input
          className="modal__input"
          id="register-email"
          name="email"
          type="email"
          value={values.email || ''}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </div>
      
      <div className="modal__input-group">
        <label className="modal__label" htmlFor="register-password">Password*</label>
        <input
          className="modal__input"
          id="register-password"
          name="password"
          type="password"
          value={values.password || ''}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </div>

      <div className="modal__input-group">
        <label className="modal__label" htmlFor="register-name">Name*</label>
        <input
          className="modal__input"
          id="register-name"
          name="name"
          type="text"
          value={values.name || ''}
          onChange={handleChange}
          placeholder="Name"
          required
        />
      </div>
      
      <div className="modal__input-group">
        <label className="modal__label" htmlFor="register-avatar">Avatar URL*</label>
        <input
          className="modal__input"
          id="register-avatar"
          name="avatar"
          type="url"
          value={values.avatar || ''}
          onChange={handleChange}
          placeholder="Avatar URL"
          required
        />
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
