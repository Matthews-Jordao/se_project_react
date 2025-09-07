
import Header from '../Header/Header.jsx';
import WeatherCard from '../WeatherCard/WeatherCard.jsx';

// Example weather data
const weather = { temp: 75, description: 'Cloudy' };

function App() {
  return (
    <>
      <Header />
      <WeatherCard weather={weather} />
    </>
  );
}

export default App;
