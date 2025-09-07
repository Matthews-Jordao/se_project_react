import React from 'react';
import './WeatherCard.css';

function WeatherCard({ weather }) {
  return (
    <div className="weather-card">
      {/* Render weather info here */}
      {weather ? (
        <>
          <h3>{weather.temp}°C</h3>
          <p>{weather.description}</p>
        </>
      ) : (
        <p>No weather data</p>
      )}
    </div>
  );
}

export default WeatherCard;
