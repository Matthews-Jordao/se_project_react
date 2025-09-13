

import React, { useState, useCallback, useEffect } from 'react';
import Header from '../Header/Header.jsx';
import AddGarmentModal from '../AddGarmentModal/AddGarmentModal.jsx';
import WeatherCard from '../WeatherCard/WeatherCard.jsx';
import Main from '../Main/Main.jsx';
import ItemModal from '../ItemModal/ItemModal.jsx';
import Footer from '../Footer/Footer.jsx';
import { defaultClothingItems } from '../../utils/clothingItems.js';
import { fetchWeatherData } from '../../utils/weatherApi.js';


function App() {
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [weather, setWeather] = useState(null);
  const [isAddGarmentOpen, setIsAddGarmentOpen] = useState(false);

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
    <div className="app-wrapper">
      {/* App Header with Add Clothes button */}
      <Header onAddClothes={handleOpenAddGarment} />
      {/* Weather Card shows current weather info */}
      <WeatherCard weather={weather} />
      {/* Main section with all clothing items */}
  <Main clothingItems={clothingItems} onItemClick={handleOpenItemModal} weather={weather} />
      {/* Modal for item details */}
      <ItemModal
        item={selectedItem}
        isOpen={activeModal === 'item'}
        onClose={handleCloseModal}
      />
      {/* Add Garment Modal */}
      <AddGarmentModal
        isOpen={isAddGarmentOpen}
        onClose={handleCloseModal}
        onAddGarment={handleAddGarment}
      />
      <Footer />
    </div>
  );
}

export default App;
