import React from 'react'
import './App.css'
import WeatherCard from './Componets/WeatherCard'
import { useState, } from 'react';

function App() {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [locations, setLocations] = useState([
    { latitude: 22.5726, longitude: 88.3639 },
    { latitude: 28.6139, longitude: 77.2090 },
    { latitude: 19.0760, longitude: 72.8777 },
  ]);
  const handleReport = () => {
    if (latitude && longitude) {
      const newLocation = {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      };
      setLocations((prevLocations) => [...prevLocations, newLocation]);
      setLatitude('');
      setLongitude('');
    }
  };


  return (
    <>
      <div className="app">
        <h1>Weather Forecast</h1>

        <div className='locations-entries'>
          <label htmlFor='lat' style={{ marginRight: '10px', fontSize: '16px' }}>Latitude: </label>
          <input
            id='lat'
            type='number'
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            style={{ padding: '8px', width: '150px', marginRight: '20px', fontSize: '16px' }}
          />

          <label htmlFor='long' style={{ marginRight: '10px', fontSize: '16px' }}>Longitude: </label>
          <input
            id='long'
            type='number'
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            style={{ padding: '8px', width: '150px', fontSize: '16px' }}
          />
        </div>

        <button style={{
          width: "10%", padding: "0.5%", backgroundColor: "skyblue", margin: "2%",
          fontSize: "15px",
          cursor: "pointer"
        }} onClick={handleReport}> <b>Get Details</b></button>


        <div className="weather-cards">
          {locations.map((location, index) => (
            <WeatherCard
              key={index}
              latitude={location.latitude}
              longitude={location.longitude}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default App
