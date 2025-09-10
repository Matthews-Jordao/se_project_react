// weatherApi.js
// Handles fetching and processing weather data from OpenWeather API
import { OPENWEATHER_API_KEY, DEFAULT_COORDS } from "./constants";

export async function fetchWeatherData(coords = DEFAULT_COORDS) {
  const { latitude, longitude } = coords;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${OPENWEATHER_API_KEY}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather API error");
    const data = await response.json();
    return extractWeatherInfo(data);
  } catch (err) {
    console.error("Failed to fetch weather:", err);
    return null;
  }
}

export function extractWeatherInfo(apiData) {
  // Extract city name and temperature from API response
  return {
    city: apiData.name,
    temperature: apiData.main?.temp,
    weatherType: getWeatherCondition(apiData.main?.temp)
  };
}

export function getWeatherCondition(tempF) {
  if (typeof tempF !== "number") return "unknown";
  if (tempF >= 86) return "hot";
  if (tempF >= 66) return "warm";
  return "cold";
}
