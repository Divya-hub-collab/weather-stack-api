import React, { useState } from 'react';
import './App.css';
import LocationFilter from './components/LocationFilter';
import CurrentWeather from './components/CurrentWeather';
import HistoricalWeather from './components/HistoricalWeather';
import MarineWeather from './components/MarineWeather';
import weatherService from './services/weatherService';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [historicalWeather, setHistoricalWeather] = useState(null);
  const [marineWeather, setMarineWeather] = useState(null);
  
  const [currentLoading, setCurrentLoading] = useState(false);
  const [historicalLoading, setHistoricalLoading] = useState(false);
  const [marineLoading, setMarineLoading] = useState(false);
  
  const [currentError, setCurrentError] = useState(null);
  const [historicalError, setHistoricalError] = useState(null);
  const [marineError, setMarineError] = useState(null);

  const [currentLocation, setCurrentLocation] = useState('');

  const handleLocationChange = async (location) => {
    setCurrentLocation(location);
    setCurrentError(null);
    setHistoricalError(null);
    
    // Fetch current weather
    setCurrentLoading(true);
    try {
      const data = await weatherService.getCurrentWeather(location);
      setCurrentWeather(data);
      setCurrentError(null);
    } catch (error) {
      setCurrentError(error.message);
      setCurrentWeather(null);
    } finally {
      setCurrentLoading(false);
    }
  };

  const handleHistoricalDateChange = async (date) => {
    if (!currentLocation) {
      setHistoricalError('Please search for a location first');
      return;
    }

    setHistoricalLoading(true);
    setHistoricalError(null);
    try {
      const data = await weatherService.getHistoricalWeather(currentLocation, date);
      setHistoricalWeather(data);
      setHistoricalError(null);
    } catch (error) {
      setHistoricalError(error.message);
      setHistoricalWeather(null);
    } finally {
      setHistoricalLoading(false);
    }
  };

  const handleCoordinatesChange = async (latitude, longitude) => {
    setMarineLoading(true);
    setMarineError(null);
    try {
      const data = await weatherService.getMarineWeather(latitude, longitude);
      setMarineWeather(data);
      setMarineError(null);
    } catch (error) {
      setMarineError(error.message);
      setMarineWeather(null);
    } finally {
      setMarineLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="app-container">
        <header className="app-header">
          <h1>WeatherStack</h1>
          <p className="app-subtitle">Real-time, Historical & Marine Weather Data</p>
        </header>

        <LocationFilter
          onLocationChange={handleLocationChange}
          onCoordinatesChange={handleCoordinatesChange}
        />

        <div className="weather-grid">
          <CurrentWeather
            data={currentWeather}
            loading={currentLoading}
            error={currentError}
          />
          
          <HistoricalWeather
            data={historicalWeather}
            loading={historicalLoading}
            error={historicalError}
            onDateChange={handleHistoricalDateChange}
          />
          
          <MarineWeather
            data={marineWeather}
            loading={marineLoading}
            error={marineError}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
