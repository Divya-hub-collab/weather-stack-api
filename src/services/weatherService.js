import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHERSTACK_API_KEY;
const BASE_URL = 'https://api.weatherstack.com';

function requireApiKey() {
  if (!API_KEY) {
    throw new Error(
      'Missing API key. Create a .env file with REACT_APP_WEATHERSTACK_API_KEY=YOUR_KEY and restart the dev server.'
    );
  }
}

const weatherService = {
  // Get current weather
  getCurrentWeather: async (location) => {
    try {
      requireApiKey();
      const response = await axios.get(`${BASE_URL}/current`, {
        params: {
          access_key: API_KEY,
          query: location,
          units: 'm'
        }
      });
      
      if (response.data.error) {
        throw new Error(response.data.error.info || `Error ${response.data.error.code}: ${response.data.error.type}`);
      }
      
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error?.info || 
                          error.response?.data?.error?.type || 
                          error.message || 
                          'Failed to fetch current weather';
      throw new Error(errorMessage);
    }
  },

  // Get historical weather
  getHistoricalWeather: async (location, date) => {
    try {
      requireApiKey();
      // Ensure date is in YYYY-MM-DD format
      const formattedDate = date.includes('T') ? date.split('T')[0] : date;
      
      const response = await axios.get(`${BASE_URL}/historical`, {
        params: {
          access_key: API_KEY,
          query: location,
          historical_date: formattedDate,
          units: 'm'
        }
      });
      
      if (response.data.error) {
        const errorCode = response.data.error.code;
        let errorMsg = response.data.error.info || `Error ${errorCode}: ${response.data.error.type}`;
        
        // Provide user-friendly messages for common errors
        if (errorCode === 603) {
          errorMsg = 'Historical weather is not available on your current plan. Please upgrade to Standard plan or higher.';
        } else if (errorCode === 611 || errorCode === 614) {
          errorMsg = 'Invalid date format. Please use YYYY-MM-DD format (e.g., 2020-01-15).';
        }
        
        throw new Error(errorMsg);
      }
      
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.error?.info || 
                          error.response?.data?.error?.type || 
                          error.message || 
                          'Failed to fetch historical weather';
      throw new Error(errorMessage);
    }
  },

  // Get marine weather
  getMarineWeather: async (latitude, longitude) => {
    try {
      requireApiKey();
      // Try using coordinates as query parameter (format: lat,lon)
      const response = await axios.get(`${BASE_URL}/marine`, {
        params: {
          access_key: API_KEY,
          query: `${latitude},${longitude}`,
          units: 'm'
        }
      });
      
      if (response.data.error) {
        const errorCode = response.data.error.code;
        let errorMsg = response.data.error.info || `Error ${errorCode}: ${response.data.error.type}`;
        
        // Provide user-friendly messages for common errors
        if (errorCode === 616) {
          errorMsg = 'Missing latitude value. Please enter a valid latitude.';
        } else if (errorCode === 617) {
          errorMsg = 'Missing longitude value. Please enter a valid longitude.';
        } else if (errorCode === 618) {
          errorMsg = 'Invalid latitude. Please enter a number between -90 and 90.';
        } else if (errorCode === 619) {
          errorMsg = 'Invalid longitude. Please enter a number between -180 and 180.';
        }
        
        throw new Error(errorMsg);
      }
      
      return response.data;
    } catch (error) {
      // If marine endpoint doesn't exist, try using current endpoint with coordinates
      if (error.response?.status === 404 || error.message.includes('404')) {
        try {
          const response = await axios.get(`${BASE_URL}/current`, {
            params: {
              access_key: API_KEY,
              query: `${latitude},${longitude}`,
              units: 'm'
            }
          });
          
          if (response.data.error) {
            throw new Error(response.data.error.info || `Error ${response.data.error.code}: ${response.data.error.type}`);
          }
          
          // Return as marine weather format (even though it's current weather)
          // This is a fallback since marine endpoint might not be available
          return {
            ...response.data,
            marine: response.data.current ? [{
              water_temperature: response.data.current.temperature,
              wave_height: 'N/A',
              wave_period: 'N/A',
              wave_direction: response.data.current.wind_dir,
              wind_speed: response.data.current.wind_speed,
              wind_dir: response.data.current.wind_dir,
              wind_degree: response.data.current.wind_degree,
              visibility: response.data.current.visibility,
              pressure: response.data.current.pressure
            }] : null
          };
        } catch (fallbackError) {
          const errorMessage = fallbackError.response?.data?.error?.info || 
                              fallbackError.response?.data?.error?.type || 
                              fallbackError.message || 
                              'Marine weather endpoint is not available. This feature may require a higher subscription plan.';
          throw new Error(errorMessage);
        }
      }
      
      const errorMessage = error.response?.data?.error?.info || 
                          error.response?.data?.error?.type || 
                          error.message || 
                          'Failed to fetch marine weather. Marine weather may not be available on your current plan.';
      throw new Error(errorMessage);
    }
  },

  // Get location autocomplete
  getLocations: async (query) => {
    try {
      requireApiKey();
      const response = await axios.get(`${BASE_URL}/autocomplete`, {
        params: {
          access_key: API_KEY,
          query: query
        }
      });
      return response.data;
    } catch (error) {
      // If autocomplete endpoint doesn't exist, return empty array
      return { results: [] };
    }
  }
};

export default weatherService;
