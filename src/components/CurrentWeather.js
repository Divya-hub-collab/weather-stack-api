import React from 'react';
import './WeatherCard.css';

const CurrentWeather = ({ data, loading, error }) => {
  if (loading) {
    return (
      <div className="weather-card">
        <div className="loading">Loading current weather...</div>
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

  if (!data || !data.current) {
    return (
      <div className="weather-card">
        <div className="empty-state">Search for a location to see current weather</div>
      </div>
    );
  }

  const { current, location } = data;

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>Current Weather</h2>
        <div className="location-info">
          <span className="location-name">{location?.name}</span>
          <span className="location-details">
            {location?.region && `${location.region}, `}
            {location?.country}
          </span>
        </div>
      </div>

      <div className="weather-main">
        <div className="temperature-section">
          <div className="temperature">
            {current.temperature}°C
          </div>
          <div className="weather-description">
            {current.weather_descriptions?.[0] || 'N/A'}
          </div>
        </div>
        <div className="weather-icon">
          <img 
            src={current.weather_icons?.[0]} 
            alt={current.weather_descriptions?.[0]} 
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Feels Like</span>
          <span className="detail-value">{current.feelslike}°C</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{current.humidity}%</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind Speed</span>
          <span className="detail-value">{current.wind_speed} km/h</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind Direction</span>
          <span className="detail-value">{current.wind_dir}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Pressure</span>
          <span className="detail-value">{current.pressure} mb</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">UV Index</span>
          <span className="detail-value">{current.uv_index || 'N/A'}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Visibility</span>
          <span className="detail-value">{current.visibility} km</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Cloud Cover</span>
          <span className="detail-value">{current.cloudcover}%</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
