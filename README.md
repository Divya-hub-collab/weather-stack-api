# weather-stack-api

Weatherstack is a RESTful weather service that provides current weather data, forecasts, and historical weather information for locations worldwide in JSON format.

# WeatherStack Weather App

A beautiful React application that fetches and displays weather data from the Weatherstack API. Features include current weather, historical weather, and marine weather with a stunning glass morphic design.

## Features

- **Current Weather**: Real-time weather information for any location
- **Historical Weather**: View past weather data by selecting a date
- **Marine Weather**: Get marine weather conditions using coordinates
- **Glass Morphic UI**: Modern, beautiful glassmorphism design
- **Location Search**: Easy location filtering and search

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## API Configuration

The app uses the Weatherstack API. Create a `.env` file in the project root:

```bash
REACT_APP_WEATHERSTACK_API_KEY=YOUR_KEY_HERE
```

Then restart the dev server (`npm start`).

## Usage

1. **Current Weather**: Enter a city name in the location search and click "Search"
2. **Historical Weather**: After searching for a location, select a date to view historical data
3. **Marine Weather**: Enter latitude and longitude coordinates and click "Get Marine Weather"

## Project Structure

```
src/
  ├── components/
  │   ├── LocationFilter.js       # Location and coordinate input
  │   ├── CurrentWeather.js       # Current weather display
  │   ├── HistoricalWeather.js    # Historical weather display
  │   ├── MarineWeather.js        # Marine weather display
  │   └── *.css                   # Component styles
  ├── services/
  │   └── weatherService.js       # API service layer
  ├── App.js                      # Main app component
  ├── App.css                     # App styles
  ├── index.js                    # Entry point
  └── index.css                   # Global styles
```

## Technologies Used

- React 18
- Axios for API calls
- CSS3 with Glass Morphism effects
- Weatherstack API

## License

This project is open source and available under the MIT License.
