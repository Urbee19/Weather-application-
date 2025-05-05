import React, { useState, useEffect } from 'react';
import './App.css';
 
function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const fetchWeather = async (cityName, setWeatherFunc) => {
    setLoading(true);
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const data = await response.json();
      setWeatherFunc({
        temp: data.main.temp,
        condition: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city !== '') {
      fetchWeather(city, setWeatherData);
    } else {
      setWeatherData(null);
      setError(null);
    }
  }, [city]);

  const addFavorite = () => {
    if (city && !favorites.some((fav) => fav.city === city)) {
      setFavorites([...favorites, { city, weatherData }]);
    }
  };

  return (
    <div className="main-container">
      { }
      <div className="sidebar">
        <h3>Favorites</h3>
        {favorites.length > 0 ? (
          favorites.map((fav, index) => (
            <div key={index} className="favorite-city">
              <h4>{fav.city}</h4>
              <WeatherDetails data={fav.weatherData} />
            </div>
          ))
        ) : (
          <p>No favorites yet</p>
        )}
      </div>

      {/* Main weather info */}
      <div className="app-container">
        <h1 className="app-title">Weather App</h1>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Enter a City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="favorite-button" onClick={addFavorite}>
            Add to Favorites
          </button>
        </div>

        {loading && <p>Loading...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {/* Only show weather data when there is valid data and no error */}
        {weatherData && !loading && !error && (
          <div className="weather-info-card">
            <h2>{city}</h2>
            <WeatherDetails data={weatherData} />
          </div>
        )}
      </div>
    </div>
  );
}

const WeatherDetails = ({ data }) => (
  <div className="weather-data">
    <div className="weather-item">
      <span className="weather-label">Temperature:</span> {data.temp}°C
    </div>
    <div className="weather-item">
      <span className="weather-label">Condition:</span> {data.condition}
    </div>
    <div className="weather-item">
      <span className="weather-label">Humidity:</span> {data.humidity}%
    </div>
    <div className="weather-item">
      <span className="weather-label">Wind Speed:</span> {data.windSpeed} km/h
    </div>
  </div>
);

export default App;
