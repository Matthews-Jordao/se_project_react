import React from 'react';
import './WeatherCard.css';

// This function picks the right weather background image
function getWeatherBackground(weatherType, isDay) {
  // Images are in src/assets/weather-backgrounds
  // Format: weather-type-day.svg or weather-type-night.svg
  const base = '/src/assets/weather-backgrounds/weather-';
  const ext = '.svg';
  let type = '';
  switch (weatherType?.toLowerCase()) {
    case 'sunny': type = 'sunny'; break;
    case 'cloudy': type = 'cloudy'; break;
    case 'rain': type = 'rain'; break;
    case 'storm': type = 'storm'; break;
    case 'snow': type = 'snow'; break;
    case 'fog': type = 'fog'; break;
    default: type = 'cloudy'; // if nothing matches, just use cloudy
  }
  // If it's daytime, use the day image, else use night
  return isDay
    ? `${base}${type}-day${ext}`
    : `${base}${type}-night${ext}`;
}

// WeatherCard shows the weather and the background image
function WeatherCard({ weather }) {
  // Just using true for day for now (could be dynamic)
  const isDay = true;
  // Get the background image for the card
  const bgImage = getWeatherBackground(weather?.type || weather?.description, isDay);

  return (
    <div
      className="weather-card"
      style={{ background: `url('${bgImage}') center/cover no-repeat, rgba(255,255,255,0)` }}
      aria-label="Weather Card"
    >
      {/* Show the temperature on the left */}
      <div className="weather-card__temp" aria-label="Temperature">
        {weather ? `${weather.temp}°F` : '--'}
      </div>
    </div>
  );
}

export default WeatherCard;
