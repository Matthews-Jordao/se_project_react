
import React, { useContext } from 'react';
import './WeatherCard.css';
import CurrentTemperatureUnitContext from '../../../../contexts/CurrentTemperatureUnitContext.js';

function getWeatherBackground(weatherType, isDay) {
  const base = '/src/assets/weather-backgrounds/weather-';
  const ext = '.svg';
  
  let type = 'cloudy'; // default fallback
  
  if (weatherType === 'sunny') type = 'sunny';
  else if (weatherType === 'cloudy') type = 'cloudy';
  else if (weatherType === 'rain') type = 'rain';
  else if (weatherType === 'storm') type = 'storm';
  else if (weatherType === 'snow') type = 'snow';
  else if (weatherType === 'fog') type = 'fog';
  
  return `${base}${type}-${isDay ? 'day' : 'night'}${ext}`;
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
