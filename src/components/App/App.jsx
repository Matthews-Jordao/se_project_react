import './App.css';

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from '../common/Header/Header.jsx';
import Footer from '../common/Footer/Footer.jsx';
import Main from '../pages/HomePage/Main/Main.jsx';
import Profile from '../pages/ProfilePage/Profile/Profile.jsx';
import AddItemModal from '../modals/AddItemModal/AddItemModal.jsx';
import ItemModal from '../modals/ItemModal/ItemModal.jsx';
import DeleteConfirmationModal from '../modals/DeleteConfirmationModal/DeleteConfirmationModal.jsx';
import { fetchWeatherData } from '../../utils/weatherApi.js';
import { getItems, addItem, deleteItem } from '../../utils/api.js';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext.js';


function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [weather, setWeather] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  
  // Modal states
  const [activeModal, setActiveModal] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

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

  const handleCloseModal = () => {
    setActiveModal('');
    setSelectedItem(null);
    setIsAddItemOpen(false);
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleAddItem = (newItem, resetForm) => {
    addItem(newItem)
      .then((savedItem) => {
        setClothingItems(prev => [savedItem, ...prev]);
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
      deleteItem(itemToDelete._id)
        .then(() => {
          setClothingItems(prev => prev.filter(item => item._id !== itemToDelete._id));
          handleCloseModal();
        })
        .catch(console.error);
    }
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === 'F' ? 'C' : 'F');
  };

  // Close modals with Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') handleCloseModal();
    };
    
    if (activeModal || isAddItemOpen || isDeleteModalOpen) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [activeModal, isAddItemOpen, isDeleteModalOpen]);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                <div className="app-wrapper">
                  <div className="home-page">
                    <Header onAddClothes={handleOpenAddItem} city={weather?.city} />
                    <Main clothingItems={clothingItems} onItemClick={handleOpenItemModal} weather={weather} />
                    <Footer />
                  </div>
                </div>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <div className="app-wrapper">
                  <div className="profile-page">
                    <Header onAddClothes={handleOpenAddItem} city={weather?.city} />
                    <Profile 
                      clothingItems={clothingItems}
                      onItemClick={handleOpenItemModal}
                      onAddClothes={handleOpenAddItem}
                    />
                    <Footer />
                  </div>
                </div>
              } 
            />
          </Routes>
            
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
            onClose={handleCloseModal}
            onConfirm={handleConfirmDelete}
            itemName={itemToDelete?.name}
          />
        </BrowserRouter>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
