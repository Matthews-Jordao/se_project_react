
import React, { useContext } from 'react';
import './WeatherCard.css';
import CurrentTemperatureUnitContext from '../../../../contexts/CurrentTemperatureUnitContext.js';

import weatherCloudyDay from '../../../../assets/weather-backgrounds/weather-cloudy-day.svg';
import weatherCloudyNight from '../../../../assets/weather-backgrounds/weather-cloudy-night.svg';
import weatherFogDay from '../../../../assets/weather-backgrounds/weather-fog-day.svg';
import weatherFogNight from '../../../../assets/weather-backgrounds/weather-fog-night.svg';
import weatherRainDay from '../../../../assets/weather-backgrounds/weather-rain-day.svg';
import weatherRainNight from '../../../../assets/weather-backgrounds/weather-rain-night.svg';
import weatherSnowDay from '../../../../assets/weather-backgrounds/weather-snow-day.svg';
import weatherSnowNight from '../../../../assets/weather-backgrounds/weather-snow-night.svg';
import weatherStormDay from '../../../../assets/weather-backgrounds/weather-storm-day.svg';
import weatherStormNight from '../../../../assets/weather-backgrounds/weather-storm-night.svg';
import weatherSunnyDay from '../../../../assets/weather-backgrounds/weather-sunny-day.svg';
import weatherSunnyNight from '../../../../assets/weather-backgrounds/weather-sunny-night.svg';

const weatherBackgrounds = {
  sunny: {
    day: weatherSunnyDay,
    night: weatherSunnyNight,
  },
  cloudy: {
    day: weatherCloudyDay,
    night: weatherCloudyNight,
  },
  rain: {
    day: weatherRainDay,
    night: weatherRainNight,
  },
  storm: {
    day: weatherStormDay,
    night: weatherStormNight,
  },
  snow: {
    day: weatherSnowDay,
    night: weatherSnowNight,
  },
  fog: {
    day: weatherFogDay,
    night: weatherFogNight,
  },
};

function getWeatherBackground(weatherType, isDay) {
  const timeOfDay = isDay ? 'day' : 'night';
  const defaultBackground = weatherBackgrounds.cloudy[timeOfDay];
  
  return weatherBackgrounds[weatherType]?.[timeOfDay] || defaultBackground;
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
