import React, { useContext } from 'react';
import './Main.css';
import ItemCard from '../../../common/ItemCard/ItemCard.jsx';
import { getWeatherCondition } from '../../../../utils/weatherApi.js';
import CurrentTemperatureUnitContext from '../../../../contexts/CurrentTemperatureUnitContext.js';

function Main({ clothingItems, onItemClick, weather }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  
  const temp = weather?.temperature?.F; // Use Fahrenheit for weather condition logic
  const weatherCondition = typeof temp === 'number' ? getWeatherCondition(temp) : null;
  const filteredItems = clothingItems?.filter(item => item.weather === weatherCondition);
  
  return (
    <main className="main">
      {weather?.temperature && (
        <div className="main__title">
          Today is {weather.temperature[currentTemperatureUnit]}°{currentTemperatureUnit} / You may want to wear:
        </div>
      )}
      {/* Render only clothing items that match the current weather */}
      {filteredItems && filteredItems.length > 0 ? (
        filteredItems.map(item => (
          <ItemCard key={item._id} item={item} onClick={onItemClick || (() => {})} />
        ))
      ) : (
        <div style={{ width: '100%', textAlign: 'center', marginTop: '24px', color: '#888' }}>
          No clothing items match the current weather.
        </div>
      )}
    </main>
  );
}

export default Main;
