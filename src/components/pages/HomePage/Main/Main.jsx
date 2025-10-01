import React, { useContext } from 'react';
import './Main.css';
import ItemCard from '../../../common/ItemCard/ItemCard.jsx';
import WeatherCard from '../WeatherCard/WeatherCard.jsx';
import { getWeatherCondition } from '../../../../utils/weatherApi.js';
import CurrentTemperatureUnitContext from '../../../../contexts/CurrentTemperatureUnitContext.js';

function Main({ clothingItems, onItemClick, weather }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  
  const temp = weather?.temperature?.F;
  const weatherCondition = typeof temp === 'number' ? getWeatherCondition(temp) : null;
  const filteredItems = clothingItems?.filter(item => item.weather === weatherCondition);
  
  return (
    <main className="main">
      <WeatherCard weather={weather} />
      
      {weather?.temperature && (
        <div className="main__title">
          Today is {weather.temperature[currentTemperatureUnit]}°{currentTemperatureUnit} / You may want to wear:
        </div>
      )}
      
      {filteredItems && filteredItems.length > 0 ? (
        filteredItems.map(item => (
          <ItemCard key={item._id} item={item} onClick={onItemClick || (() => {})} />
        ))
      ) : (
        <div className="main__empty-state">
          No clothing items match the current weather.
        </div>
      )}
    </main>
  );
}

export default Main;
