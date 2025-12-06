import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Header from '../common/Header/Header.jsx';
import Footer from '../common/Footer/Footer.jsx';
import Main from '../pages/HomePage/Main/Main.jsx';
import Profile from '../pages/ProfilePage/Profile/Profile.jsx';
import ProtectedRoute from '../common/ProtectedRoute/ProtectedRoute.jsx';
import AddItemModal from '../modals/AddItemModal/AddItemModal.jsx';
import ItemModal from '../modals/ItemModal/ItemModal.jsx';
import DeleteConfirmationModal from '../modals/DeleteConfirmationModal/DeleteConfirmationModal.jsx';
import RegisterModal from '../modals/RegisterModal/RegisterModal.jsx';
import LoginModal from '../modals/LoginModal/LoginModal.jsx';
import EditProfileModal from '../modals/EditProfileModal/EditProfileModal.jsx';
import { fetchWeatherData } from '../../utils/weatherApi.js';
import {
  getItems,
  addItem,
  deleteItem,
  updateProfile,
  likeItem,
  unlikeItem,
} from '../../utils/api.js';
import { signup, signin, checkToken } from '../../utils/auth.js';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext.js';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';

function AppContent() {
  const navigate = useNavigate();
  const [clothingItems, setClothingItems] = useState([]);
  const [weather, setWeather] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeModal, setActiveModal] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      checkToken(token)
        .then((user) => {
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error('Token validation failed:', err);
          localStorage.removeItem('jwt');
        });
    }
  }, []);

  useEffect(() => {
    fetchWeatherData().then(setWeather).catch(console.error);
    getItems().then(setClothingItems).catch(console.error);
  }, []);

  const handleOpenItemModal = (item) => {
    setSelectedItem(item);
    setActiveModal('item');
  };

  const handleOpenAddItem = () => {
    setIsAddItemOpen(true);
  };

  const handleOpenRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const handleOpenLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const handleCloseModal = () => {
    setActiveModal('');
    setSelectedItem(null);
    setIsAddItemOpen(false);
    setIsDeleteModalOpen(false);
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(false);
    setIsEditProfileModalOpen(false);
    setItemToDelete(null);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleRegister = (data, resetForm) => {
    signup(data)
      .then(() => signin({ email: data.email, password: data.password }))
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          return checkToken(res.token);
        }
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        resetForm();
        handleCloseModal();
        navigate('/');
      })
      .catch((err) => {
        console.error('Registration error:', err);
      });
  };

  const handleLogin = (data, resetForm) => {
    signin(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          return checkToken(res.token);
        }
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        resetForm();
        handleCloseModal();
        navigate('/');
      })
      .catch((err) => {
        console.error('Login error:', err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setCurrentUser(null);
    setIsLoggedIn(false);
  };

  const handleEditProfile = (data, resetForm) => {
    const token = localStorage.getItem('jwt');
    updateProfile(data, token)
      .then((updatedUser) => {
        setCurrentUser((prev) => ({ ...prev, ...updatedUser }));
        resetForm();
        handleCloseModal();
      })
      .catch((err) => {
        console.error('Profile update error:', err);
      });
  };

  const handleAddItem = (newItem, resetForm) => {
    const token = localStorage.getItem('jwt');
    addItem(newItem, token)
      .then((savedItem) => {
        setClothingItems((prev) => [savedItem, ...prev]);
        resetForm();
        handleCloseModal();
      })
      .catch(console.error);
  };

  const handleOpenDeleteModal = (cardToDelete) => {
    setItemToDelete(cardToDelete);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      const token = localStorage.getItem('jwt');
      deleteItem(itemToDelete._id, token)
        .then(() => {
          setClothingItems((prev) =>
            prev.filter((item) => item._id !== itemToDelete._id)
          );
          handleCloseModal();
        })
        .catch(console.error);
    }
  };

  const handleCardLike = ({ _id, isLiked }) => {
    const token = localStorage.getItem('jwt');
    const action = isLiked ? unlikeItem : likeItem;
    action(_id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === _id ? updatedCard : item))
        );
      })
      .catch(console.error);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === 'F' ? 'C' : 'F');
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') handleCloseModal();
    };

    if (
      activeModal ||
      isAddItemOpen ||
      isDeleteModalOpen ||
      isRegisterModalOpen ||
      isLoginModalOpen ||
      isEditProfileModalOpen
    ) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [
    activeModal,
    isAddItemOpen,
    isDeleteModalOpen,
    isRegisterModalOpen,
    isLoginModalOpen,
    isEditProfileModalOpen,
  ]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="app-wrapper">
            <div className="home-page">
              <Header
                onAddClothes={handleOpenAddItem}
                city={weather?.city}
                isLoggedIn={isLoggedIn}
                onRegisterClick={handleOpenRegisterModal}
                onLoginClick={handleOpenLoginModal}
                onLogout={handleLogout}
              />
              <Main
                clothingItems={clothingItems}
                onItemClick={handleOpenItemModal}
                weather={weather}
                onCardLike={handleCardLike}
                isLoggedIn={isLoggedIn}
              />
              <Footer />
            </div>
          </div>

          <ItemModal
            item={selectedItem}
            isOpen={activeModal === 'item'}
            onClose={handleCloseModal}
            onDelete={handleOpenDeleteModal}
          />
          <AddItemModal
            isOpen={isAddItemOpen}
            onCloseModal={handleCloseModal}
            onAddItem={handleAddItem}
          />
          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={handleCloseDeleteModal}
            onConfirm={handleConfirmDelete}
            itemName={itemToDelete?.name}
          />
          <RegisterModal
            isOpen={isRegisterModalOpen}
            onRegister={handleRegister}
            onCloseModal={handleCloseModal}
            onLoginClick={() => {
              handleCloseModal();
              handleOpenLoginModal();
            }}
          />
          <LoginModal
            isOpen={isLoginModalOpen}
            onLogin={handleLogin}
            onCloseModal={handleCloseModal}
            onRegisterClick={() => {
              handleCloseModal();
              handleOpenRegisterModal();
            }}
          />
          <EditProfileModal
            isOpen={isEditProfileModalOpen}
            currentUser={currentUser}
            onEditProfile={handleEditProfile}
            onCloseModal={handleCloseModal}
          />
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
