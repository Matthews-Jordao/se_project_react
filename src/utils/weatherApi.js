

// This file helps us get weather info from OpenWeather API and process it for our app.
// Written by a student learning how APIs work!

import { OPENWEATHER_API_KEY, DEFAULT_COORDS } from "./constants";

// fetchWeatherData: Gets weather info for a location (default is set in constants.js)
export async function fetchWeatherData(coords = DEFAULT_COORDS) {
  // Build the API URL using our key and coordinates
  const { latitude, longitude } = coords;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${OPENWEATHER_API_KEY}`;
  try {
    // Call the API and get the response
    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather API error");
    // Convert the response to JSON
    const data = await response.json();
    // Use our helper to extract just what we need
    return extractWeatherInfo(data);
  } catch (err) {
    // If something goes wrong, show it in the console
    console.error("Failed to fetch weather:", err);
    return null;
  }
}

// extractWeatherInfo: Pulls out the stuff we care about from the API response
export function extractWeatherInfo(apiData) {
  // Get the main weather type (like Rain, Clouds, etc.)
  const weatherTypeRaw = apiData.weather?.[0]?.main?.toLowerCase() || '';
  // Map OpenWeather types to our app's backgrounds
  let weatherType;
  switch (weatherTypeRaw) {
    case 'clear':
    case 'sunny':
      weatherType = 'sunny';
      break;
    case 'clouds':
      weatherType = 'cloudy';
      break;
    case 'rain':
    case 'drizzle':
      weatherType = 'rain';
      break;
    case 'thunderstorm':
      weatherType = 'storm';
      break;
    case 'snow':
      weatherType = 'snow';
      break;
    case 'fog':
    case 'mist':
    case 'haze':
      weatherType = 'fog';
      break;
    default:
      weatherType = 'cloudy'; // If we don't know, just use cloudy
  }

  // Figure out if it's day or night using sunrise/sunset and current time
  const now = apiData.dt || Math.floor(Date.now() / 1000); // API gives time in seconds
  const sunrise = apiData.sys?.sunrise;
  const sunset = apiData.sys?.sunset;
  let isDay = true;
  if (typeof sunrise === 'number' && typeof sunset === 'number') {
    isDay = now >= sunrise && now < sunset;
  }

  // Return just the info our app needs
  return {
    city: apiData.name, // City name
    temperature: {
      F: apiData.main?.temp, // Current temp in Fahrenheit
      C: Math.round((apiData.main?.temp - 32) * 5/9) // Convert to Celsius
    },
    weatherType, // sunny, cloudy, rain, etc.
    description: apiData.weather?.[0]?.description || '', // More details
    isDay, // true if it's daytime
  };
}

// getWeatherCondition: Decides if it's hot, warm, or cold based on temp
export function getWeatherCondition(tempF) {
  if (typeof tempF !== "number") return "unknown";
  if (tempF >= 86) return "hot";
  if (tempF >= 66) return "warm";
  return "cold";
}
