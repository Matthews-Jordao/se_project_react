
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
  const weatherTypeRaw = apiData.weather?.[0]?.main?.toLowerCase() || '';
  
  // Map weather types to app backgrounds
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
      weatherType = 'cloudy';
  }

  // Check if it's day or night
  const now = apiData.dt || Math.floor(Date.now() / 1000);
  const sunrise = apiData.sys?.sunrise;
  const sunset = apiData.sys?.sunset;
  let isDay = true;
  if (typeof sunrise === 'number' && typeof sunset === 'number') {
    isDay = now >= sunrise && now < sunset;
  }

  return {
    city: apiData.name,
    temperature: {
      F: apiData.main?.temp,
      C: Math.round((apiData.main?.temp - 32) * 5/9) // convert F to C
    },
    weatherType,
    description: apiData.weather?.[0]?.description || '',
    isDay,
  };
}

export function getWeatherCondition(tempF) {
  if (typeof tempF !== "number") return "unknown";
  if (tempF >= 86) return "hot";
  if (tempF >= 66) return "warm";
  return "cold";
}
