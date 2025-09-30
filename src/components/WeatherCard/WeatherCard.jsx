

// WeatherCard.jsx
// This component shows the current weather and changes its background based on the weather type and time of day.
// Written by a student learning React and weather APIs!

import React, { useContext } from 'react';
import './WeatherCard.css';
import CurrentTemperatureUnitContext from '../../contexts/CurrentTemperatureUnitContext.js';

// getWeatherBackground: Picks the right background image for the weather card
function getWeatherBackground(weatherType, isDay) {
  const base = '/src/assets/weather-backgrounds/weather-';
  const ext = '.svg';
  let type = '';
  switch (weatherType) {
    case 'sunny': type = 'sunny'; break;
    case 'cloudy': type = 'cloudy'; break;
    case 'rain': type = 'rain'; break;
    case 'storm': type = 'storm'; break;
    case 'snow': type = 'snow'; break;
    case 'fog': type = 'fog'; break;
    default: type = 'cloudy'; // fallback if unknown
  }
  // Use day or night image depending on isDay
  return isDay ? `${base}${type}-day${ext}` : `${base}${type}-night${ext}`;
}

// WeatherCard: Shows the weather info and background
function WeatherCard({ weather }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  
  if (!weather) return null; // Don't show anything if no weather data
  const bgImage = getWeatherBackground(weather.weatherType, weather.isDay);
  return (
    <div
      className="weather-card"
      style={{ background: `url('${bgImage}') center/cover no-repeat, rgba(255,255,255,0)` }}
      aria-label="Weather Card"
    >
      {/* Show the temperature in big text */}
      <div className="weather-card__temp" aria-label="Temperature">
        {weather.temperature ? `${weather.temperature[currentTemperatureUnit]}°${currentTemperatureUnit}` : '--'}
      </div>
    </div>
  );
}

export default WeatherCard;
