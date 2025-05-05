import React, { useEffect, useState } from 'react'
import useFetchWeather from './hook/useFetchWeather';
import {FaTrashAlt} from 'react-icons/fa';
 
const FavoriteCities = ({favorites,removeCity}) => {
  const[favoriteWeather,setFavoriteWeather] = useState([]);
  const {fetchWeather} = useFetchWeather();  

   useEffect(()=>{

     const loadfavourites = async()=>{
        const savedFavourites = JSON.parse(localStorage.getItem('favoritesCities')) || [];
        const weatherData = await Promise.all(savedFavourites.map(fetchWeather));
         setFavoriteWeather(weatherData);
     }
     loadfavourites();
   },[favorites,removeCity]);

  return (
    <div className='mt-8'>
       {favoriteWeather.length > 0 ? (
       <h3 className='text-2xl font-bold text-center'>Favorite Cities</h3>
       ) :(<h3 className='text-2xl font-bold text-center'>No Favorite Cities found</h3>)}
       
       <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4'>
         {favoriteWeather.map((city)=>(
          <div key={city.id} className='text-center p-6 bg-white rounded-lg shadow-lg transition-all transform hover:scale-105 duration-300 ease-in-out'>
             <h4 className='text-xl font-bold mb-2'>{city.name}</h4>
             <p className='text-lg text-gray-600'>{city.weather[0].description}</p>
             <div className='flex items-center space-x-3 mb-4'>
              <p><img  src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
              alt="weather icon"
              className='w-16 h-16 animate-pulse'/></p>
              <p className='text-4xl font-semibold text-gray-800'>{Math.round(city.main.temp -273.15)}°C</p>
              </div>
              <button onClick={()=>removeCity(city.name)} title="Delete City" className='absolute top-2 right-2 bg-white text-red-400 rounded-full p-2 hover:bg-red-400 hover:text-white transition-colors duration-300 ease-in-out'>
               <FaTrashAlt className='w-6 h-6'/>
              </button>
          </div>
          ))}
       </div>
    </div>
  )
}

export default FavoriteCities
