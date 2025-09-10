
import React, { useState, useCallback, useEffect } from 'react';
import Header from '../Header/Header.jsx';
import WeatherCard from '../WeatherCard/WeatherCard.jsx';
import Main from '../Main/Main.jsx';
import ItemModal from '../ItemModal/ItemModal.jsx';
import { defaultClothingItems } from '../../utils/clothingItems.js';
import { fetchWeatherData } from '../../utils/weatherApi.js';




function App() {
  // State for clothing items
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  // Modal state
  const [activeModal, setActiveModal] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  // Weather state
  const [weather, setWeather] = useState(null);

  // Fetch weather data on mount
  useEffect(() => {
    fetchWeatherData().then((data) => {
      setWeather(data);
    });
  }, []);

  // Open item modal
  const handleOpenItemModal = useCallback((item) => {
    setSelectedItem(item);
    setActiveModal('item');
  }, []);

  // Close any modal
  const handleCloseModal = useCallback(() => {
    setActiveModal('');
    setSelectedItem(null);
  }, []);

  // Close modal on Escape key
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
    <>
      <Header />
      <WeatherCard weather={weather} />
      <Main clothingItems={clothingItems} onItemClick={handleOpenItemModal} />
      <ItemModal
        item={selectedItem}
        isOpen={activeModal === 'item'}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default App;
