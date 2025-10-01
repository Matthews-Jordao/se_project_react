
import React, { useContext } from 'react';
import './WeatherCard.css';
import CurrentTemperatureUnitContext from '../../../../contexts/CurrentTemperatureUnitContext.js';

// Get the correct background image based on weather and time
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
    default: type = 'cloudy';
  }
  
  return isDay ? `${base}${type}-day${ext}` : `${base}${type}-night${ext}`;
}

function WeatherCard({ weather }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  
  if (!weather) return null;
  
  const bgImage = getWeatherBackground(weather.weatherType, weather.isDay);
  
  return (
    <div
      className="weather-card"
      style={{ background: `url('${bgImage}') right center/cover no-repeat, rgba(255,255,255,0)` }}
      aria-label="Weather Card"
    >
      <div className="weather-card__temp" aria-label="Temperature">
        {weather.temperature ? `${weather.temperature[currentTemperatureUnit]}°${currentTemperatureUnit}` : '--'}
      </div>
    </div>
  );
}

export default WeatherCard;
