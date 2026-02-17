import React, { useState } from 'react';
import './WeatherCard.css';
import './HistoricalWeather.css';

const HistoricalWeather = ({ data, loading, error, onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateSubmit = (e) => {
    e.preventDefault();
    if (selectedDate) {
      // Format date to YYYY-MM-DD if needed
      const formattedDate = selectedDate.includes('T') ? selectedDate.split('T')[0] : selectedDate;
      onDateChange(formattedDate);
    }
  };

  if (loading) {
    return (
      <div className="weather-card">
        <div className="loading">Loading historical weather...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-card">
        <div className="error">{error}</div>
      </div>
    );
  }

  if (!data || !data.historical) {
    return (
      <div className="weather-card">
        <div className="historical-form-container">
          <h2>Historical Weather</h2>
          <p className="form-description">Enter a date to view historical weather data</p>
          <p className="form-note">Note: Requires Standard plan or higher. Date must be after July 2008.</p>
          <form onSubmit={handleDateSubmit} className="historical-form">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="date-input"
              max={new Date().toISOString().split('T')[0]}
            />
            <button type="submit" className="date-button">
              Get Historical Data
            </button>
          </form>
        </div>
      </div>
    );
  }

  const historical = data.historical[Object.keys(data.historical)[0]];
  const { location } = data;

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>Historical Weather</h2>
        <div className="location-info">
          <span className="location-name">{location?.name}</span>
          <span className="location-details">
            {Object.keys(data.historical)[0]}
          </span>
        </div>
      </div>

      <div className="weather-main">
        <div className="temperature-section">
          <div className="temperature">
            {historical.avgtemp}°C
          </div>
          <div className="weather-description">
            Average Temperature
          </div>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Max Temperature</span>
          <span className="detail-value">{historical.maxtemp}°C</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Min Temperature</span>
          <span className="detail-value">{historical.mintemp}°C</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Average Humidity</span>
          <span className="detail-value">{historical.avghumidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Max Wind Speed</span>
          <span className="detail-value">{historical.maxwind} km/h</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Total Precipitation</span>
          <span className="detail-value">{historical.totalprecip} mm</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">UV Index</span>
          <span className="detail-value">{historical.uv_index || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default HistoricalWeather;
