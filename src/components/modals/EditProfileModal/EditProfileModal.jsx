import React from 'react';
import ModalWithForm from '../../common/ModalWithForm/ModalWithForm.jsx';
import { useForm } from '../../../hooks/useForm.js';

const EditProfileModal = ({ isOpen, currentUser, onEditProfile, onCloseModal }) => {
  const { values, handleChange, resetForm } = useForm({
    name: currentUser?.name || '',
    avatar: currentUser?.avatar || ''
  });

  const isFormValid = values.name?.trim() && values.avatar?.trim();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    onEditProfile({
      name: values.name,
      avatar: values.avatar
    }, resetForm);
  };

  return (
    <ModalWithForm
      title="Edit profile"
      name="edit-profile"
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={onCloseModal}
      onSubmit={handleSubmit}
      disabled={!isFormValid}
    >
      <div className="modal__input-group">
        <label className="modal__label" htmlFor="profile-name">Name*</label>
        <input
          className="modal__input"
          id="profile-name"
          name="name"
          type="text"
          value={values.name || ''}
          onChange={handleChange}
          placeholder="Name"
          required
        />
      </div>
      
      <div className="modal__input-group">
        <label className="modal__label" htmlFor="profile-avatar">Avatar URL*</label>
        <input
          className="modal__input"
          id="profile-avatar"
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

export default EditProfileModal;
