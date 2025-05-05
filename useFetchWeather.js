import React, { useState } from 'react';

const YOUR_API_KEY = import.meta.env.VITE_API_KEY;

const useFetchWeather = () => {
   const [weather, setWeather] = useState(null);
   const [error, setError] = useState(null);

   const fetchWeather = async (city) => {
      setError(null); 
      setWeather(null); 
      try {
         
         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${YOUR_API_KEY}`);
         
         if (!response.ok) {
            throw new Error('City not found');
         }
         
         const data = await response.json();
         setWeather(data);
         return data;
      } catch (err) {
         setError(err.message);
         console.error("Error fetching weather data:", err);
      }
   };

   return { weather, error, fetchWeather };
};

export default useFetchWeather;