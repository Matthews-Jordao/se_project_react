import React, { useEffect, useContext, useState } from 'react';
import ModalWithForm from '../../common/ModalWithForm/ModalWithForm.jsx';
import { useForm } from '../../../hooks/useForm.js';
import CurrentUserContext from '../../../contexts/CurrentUserContext.js';

const EditProfileModal = ({
  isOpen,
  onEditProfile,
  onCloseModal,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, resetForm, setValues } = useForm({
    name: '',
    avatar: '',
  });

  const [uploadMode, setUploadMode] = useState('url');
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        name: currentUser.name || '',
        avatar: currentUser.avatar || '',
      });
      setUploadMode('url');
      setSelectedFile(null);
    }
  }, [isOpen, currentUser, setValues]);

  const isValidImageLink = !values.avatar || /^https?:\/\/.+/i.test(values.avatar);
  const isFormValid = values.name?.trim() && 
    (selectedFile || (uploadMode === 'url' && values.avatar?.trim() && isValidImageLink));

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log('=== AVATAR FILE CHANGE ===');
    console.log('File selected:', file);
    setSelectedFile(file);
    // Clear URL when file is selected
    if (file) {
      handleChange({
        target: {
          name: 'avatar',
          value: '',
        },
      });
    }
  };

  const handleUrlChange = (e) => {
    // Clear selected file when typing URL
    if (e.target.value && selectedFile) {
      setSelectedFile(null);
    }
    handleChange(e);
  };

  const switchToFileMode = () => {
    setUploadMode('file');
    setSelectedFile(null);
    handleChange({
      target: {
        name: 'avatar',
        value: '',
      },
    });
  };

  const switchToUrlMode = () => {
    setUploadMode('url');
    setSelectedFile(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    console.log('=== PROFILE SUBMIT DEBUG ===');
    console.log('uploadMode:', uploadMode);
    console.log('selectedFile:', selectedFile);
    console.log('values:', values);

    const formData = new FormData();
    formData.append('name', values.name);
    
    if (selectedFile) {
      console.log('Adding avatar file to FormData:', selectedFile.name);
      formData.append('avatar', selectedFile);
    } else {
      console.log('No file, adding avatar URL:', values.avatar);
      formData.append('avatarUrl', values.avatar);
    }

    console.log('Submitting Profile FormData');
    onEditProfile(formData, () => {
      resetForm();
      setSelectedFile(null);
      setUploadMode('url');
    });
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
        <label className="modal__label" htmlFor="profile-name">
          Name*
        </label>
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
        <label className="modal__label" htmlFor="profile-avatar">
          Avatar{uploadMode === 'file' ? ' Image' : ' URL'}*
        </label>
        
        {uploadMode === 'file' ? (
          <div className="modal__image-input-wrapper">
            <input
              type="file"
              id="profile-avatar-file"
              accept="image/*"
              onChange={handleFileChange}
              className="modal__input modal__input--with-button"
            />
            <button
              type="button"
              className="modal__upload-switch-btn"
              onClick={switchToUrlMode}
            >
              Use URL instead
            </button>
          </div>
        ) : (
          <div className="modal__image-input-wrapper">
            <input
              className={`modal__input modal__input--with-button ${values.avatar && !isValidImageLink ? 'modal__input--error' : ''}`}
              id="profile-avatar"
              name="avatar"
              type="url"
              value={values.avatar || ''}
              onChange={handleUrlChange}
              placeholder="Avatar URL"
            />
            <button
              type="button"
              className="modal__upload-switch-btn"
              onClick={switchToFileMode}
              title="Upload avatar image instead"
            >
              Upload image
            </button>
          </div>
        )}
        
        {values.avatar && !isValidImageLink && uploadMode === 'url' && (
          <span className="modal__error">
            This is not a valid image link
          </span>
        )}
      </div>
    </ModalWithForm>
  );
};

export default EditProfileModal;
