import React from 'react';
import './WeatherCard.css';

const MarineWeather = ({ data, loading, error }) => {
  if (loading) {
    return (
      <div className="weather-card">
        <div className="loading">Loading marine weather...</div>
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

  if (!data || (!data.marine && !data.current)) {
    return (
      <div className="weather-card">
        <div className="empty-state">
          <p>Enter coordinates to see marine weather</p>
          <p style={{ fontSize: '12px', marginTop: '10px', opacity: 0.7 }}>
            Note: Marine weather may require Standard plan or higher
          </p>
        </div>
      </div>
    );
  }

  // Handle both marine data and fallback current weather data
  const marine = data.marine ? data.marine[0] : (data.current ? {
    water_temperature: data.current.temperature,
    wave_height: 'N/A',
    wave_period: 'N/A',
    wave_direction: data.current.wind_dir,
    wind_speed: data.current.wind_speed,
    wind_dir: data.current.wind_dir,
    wind_degree: data.current.wind_degree,
    visibility: data.current.visibility,
    pressure: data.current.pressure
  } : null);
  
  const { location } = data;

  return (
    <div className="weather-card">
      <div className="weather-header">
        <h2>Marine Weather</h2>
        <div className="location-info">
          <span className="location-name">
            {location?.lat}°N, {location?.lon}°E
          </span>
          <span className="location-details">
            Marine Conditions
          </span>
        </div>
      </div>

      <div className="weather-main">
        <div className="temperature-section">
          <div className="temperature">
            {marine.water_temperature}°C
          </div>
          <div className="weather-description">
            Water Temperature
          </div>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Wave Height</span>
          <span className="detail-value">{marine.wave_height} m</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wave Period</span>
          <span className="detail-value">{marine.wave_period} sec</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wave Direction</span>
          <span className="detail-value">{marine.wave_direction}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind Speed</span>
          <span className="detail-value">{marine.wind_speed} km/h</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind Direction</span>
          <span className="detail-value">{marine.wind_dir}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Wind Degree</span>
          <span className="detail-value">{marine.wind_degree}°</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Visibility</span>
          <span className="detail-value">{marine.visibility} km</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Pressure</span>
          <span className="detail-value">{marine.pressure} mb</span>
        </div>
      </div>
    </div>
  );
};

export default MarineWeather;
