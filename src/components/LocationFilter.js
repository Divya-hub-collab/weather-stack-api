import React, { useState } from 'react';
import './LocationFilter.css';

const LocationFilter = ({ onLocationChange, onCoordinatesChange }) => {
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    if (location.trim()) {
      onLocationChange(location.trim());
    }
  };

  const handleCoordinatesSubmit = (e) => {
    e.preventDefault();
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    
    if (!latitude || !longitude) {
      alert('Please enter both latitude and longitude');
      return;
    }
    
    if (isNaN(lat) || lat < -90 || lat > 90) {
      alert('Latitude must be a number between -90 and 90');
      return;
    }
    
    if (isNaN(lon) || lon < -180 || lon > 180) {
      alert('Longitude must be a number between -180 and 180');
      return;
    }
    
    onCoordinatesChange(lat, lon);
  };

  return (
    <div className="location-filter">
      <div className="filter-card">
        <h3>Location Search</h3>
        <form onSubmit={handleLocationSubmit} className="filter-form">
          <input
            type="text"
            placeholder="Enter city name (e.g., London, New York)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="filter-input"
          />
          <button type="submit" className="filter-button">
            Search
          </button>
        </form>
      </div>

      <div className="filter-card">
        <h3>Marine Weather (Coordinates)</h3>
        <form onSubmit={handleCoordinatesSubmit} className="filter-form">
          <div className="coordinates-inputs">
            <input
              type="number"
              placeholder="Latitude"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="filter-input"
              step="any"
            />
            <input
              type="number"
              placeholder="Longitude"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="filter-input"
              step="any"
            />
          </div>
          <button type="submit" className="filter-button">
            Get Marine Weather
          </button>
        </form>
      </div>
    </div>
  );
};

export default LocationFilter;
