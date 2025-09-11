
// App.jsx
// This is the main component for our weather clothing app!
// Written by a student learning React and APIs.

import React, { useState, useCallback, useEffect } from 'react';
import Header from '../Header/Header.jsx';
import WeatherCard from '../WeatherCard/WeatherCard.jsx';
import Main from '../Main/Main.jsx';
import ItemModal from '../ItemModal/ItemModal.jsx';
import { defaultClothingItems } from '../../utils/clothingItems.js';
import { fetchWeatherData } from '../../utils/weatherApi.js';


function App() {
  // --- State Setup ---
  // List of clothing items (default from utils)
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  // Modal state for showing item details
  const [activeModal, setActiveModal] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  // Weather info from API
  const [weather, setWeather] = useState(null);

  // --- Fetch Weather Data on Mount ---
  useEffect(() => {
    fetchWeatherData().then((data) => {
      console.log('Weather API response:', data); // See what the API gives us!
      setWeather(data);
    });
  }, []);

  // --- Modal Handlers ---
  // Open item modal when a card is clicked
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

  // --- Render the App ---
  return (
    <>
      {/* App Header */}
      <Header />
      {/* Weather Card shows current weather info */}
      <WeatherCard weather={weather} />
      {/* Main section with all clothing items */}
      <Main clothingItems={clothingItems} onItemClick={handleOpenItemModal} />
      {/* Modal for item details */}
      <ItemModal
        item={selectedItem}
        isOpen={activeModal === 'item'}
        onClose={handleCloseModal}
      />
    </>
  );
}

export default App;
