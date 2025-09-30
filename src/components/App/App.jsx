import './App.css';


import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../common/Header/Header.jsx';
import AddGarmentModal from '../modals/AddGarmentModal/AddGarmentModal.jsx';
import AddItemModal from '../modals/AddItemModal/AddItemModal.jsx';
import WeatherCard from '../pages/HomePage/WeatherCard/WeatherCard.jsx';
import Main from '../pages/HomePage/Main/Main.jsx';
import Profile from '../pages/ProfilePage/Profile/Profile.jsx';
import SideBar from '../pages/ProfilePage/SideBar/SideBar.jsx';
import ClothesSection from '../pages/ProfilePage/ClothesSection/ClothesSection.jsx';
import ItemModal from '../modals/ItemModal/ItemModal.jsx';
import Footer from '../common/Footer/Footer.jsx';
import { defaultClothingItems } from '../../utils/clothingItems.js';
import { fetchWeatherData } from '../../utils/weatherApi.js';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext.js';


function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [weather, setWeather] = useState(null);
  const [isAddGarmentOpen, setIsAddGarmentOpen] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');

  useEffect(() => {
    fetchWeatherData().then((data) => {
      setWeather(data);
    });
  }, []);


  const handleOpenItemModal = useCallback((item) => {
    setSelectedItem(item);
    setActiveModal('item');
  }, []);

  const handleOpenAddGarment = useCallback(() => {
    setIsAddGarmentOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setActiveModal('');
    setSelectedItem(null);
    setIsAddGarmentOpen(false);
  }, []);

  const handleAddGarment = useCallback((newGarment) => {
    setClothingItems(prev => [newGarment, ...prev]);
  }, []);

  const handleAddItem = useCallback((newItem, resetForm) => {
    setClothingItems(prev => [newItem, ...prev]);
    resetForm();
    setIsAddGarmentOpen(false);
  }, []);

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === 'F'
      ? setCurrentTemperatureUnit('C')
      : setCurrentTemperatureUnit('F');
  };

  useEffect(() => {
    function handleEsc(e) {
      if (e.key === 'Escape') handleCloseModal();
    }
    if (activeModal) {
      window.addEventListener('keydown', handleEsc);
      return () => window.removeEventListener('keydown', handleEsc);
    }
  }, [activeModal, handleCloseModal]);

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
          />
          {/* Add Item Modal */}
          <AddItemModal
            isOpen={isAddGarmentOpen}
            onCloseModal={handleCloseModal}
            onAddItem={handleAddItem}
          />
          <Footer />
        </BrowserRouter>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
