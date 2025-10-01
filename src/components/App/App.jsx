import './App.css';

import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from '../common/Header/Header.jsx';
import Footer from '../common/Footer/Footer.jsx';
import WeatherCard from '../pages/HomePage/WeatherCard/WeatherCard.jsx';
import Main from '../pages/HomePage/Main/Main.jsx';
import Profile from '../pages/ProfilePage/Profile/Profile.jsx';
import SideBar from '../pages/ProfilePage/SideBar/SideBar.jsx';
import ClothesSection from '../pages/ProfilePage/ClothesSection/ClothesSection.jsx';
import AddGarmentModal from '../modals/AddGarmentModal/AddGarmentModal.jsx';
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
  const [isAddGarmentOpen, setIsAddGarmentOpen] = useState(false);
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

  const handleOpenAddGarment = () => {
    setIsAddGarmentOpen(true);
  };

  const handleCloseModal = () => {
    setActiveModal('');
    setSelectedItem(null);
    setIsAddGarmentOpen(false);
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleAddGarment = (newGarment) => {
    addItem(newGarment)
      .then((savedItem) => {
        setClothingItems(prev => [savedItem, ...prev]);
      })
      .catch(console.error);
  };

  const handleAddItem = (newItem, resetForm) => {
    addItem(newItem)
      .then((savedItem) => {
        setClothingItems(prev => [savedItem, ...prev]);
        resetForm();
        setIsAddGarmentOpen(false);
      })
      .catch(console.error);
  };

  const handleCardDelete = (cardToDelete) => {
    deleteItem(cardToDelete._id)
      .then(() => {
        setClothingItems(prev => prev.filter(item => item._id !== cardToDelete._id));
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
    
    if (activeModal || isAddGarmentOpen || isDeleteModalOpen) {
      document.addEventListener('keydown', handleEsc);
      return () => document.removeEventListener('keydown', handleEsc);
    }
  }, [activeModal, isAddGarmentOpen, isDeleteModalOpen]);

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
                    <Header onAddClothes={handleOpenAddGarment} city={weather?.city} />
                    <WeatherCard weather={weather} />
                    <Main clothingItems={clothingItems} onItemClick={handleOpenItemModal} weather={weather} />
                    <Footer />
                  </div>
                </div>
              } 
            />
            <Route 
              path="/home" 
              element={
                <div className="app-wrapper">
                  <div className="home-page">
                    <Header onAddClothes={handleOpenAddGarment} city={weather?.city} />
                    <WeatherCard weather={weather} />
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
                    <Header onAddClothes={handleOpenAddGarment} city={weather?.city} />
                    <div className="profile">
                      <section className="profile__sidebar">
                        <SideBar />
                      </section>
                      <section className="profile__clothing-section">
                        <ClothesSection 
                          clothingItems={clothingItems}
                          onItemClick={handleOpenItemModal}
                          onAddClothes={handleOpenAddGarment}
                        />
                      </section>
                    </div>
                    <Footer />
                  </div>
                </div>
              } 
            />
          </Routes>
            
          {/* Modal for item details */}
          <ItemModal
            item={selectedItem}
            isOpen={activeModal === 'item'}
            onClose={handleCloseModal}
            onDelete={handleOpenDeleteModal}
          />
          {/* Add Item Modal */}
          <AddItemModal
            isOpen={isAddGarmentOpen}
            onCloseModal={handleCloseModal}
            onAddItem={handleAddItem}
          />
          {/* Delete Confirmation Modal */}
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
