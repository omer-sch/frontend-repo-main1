import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Rain from './Rain'; // Import the Rain component
//import './MyWeather.css'; // Import CSS for MyWeather component

interface WeatherData {
  main: { temp: number; feels_like: number };
  weather: [{ main: string; description: string; icon: string }];
}

const MyWeather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [city, setCity] = useState('Tel Aviv');
  const apiKey = '174cd12447eef8aae1a61b9035a4b835';

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [city]); 

  if (!weatherData) {
    return <div style={loadingStyle}>Loading weather data...</div>;
  }
  const kelvinToCelsius = (kelvin: number) => {
    return kelvin - 273.15;
  };

  const { main, weather } = weatherData;

  return (
    <div style={containerStyle} className="text-white">
      <Rain /> {/* Add the Rain component */}
      <div style={headerStyle}>
        <h1 >Weather</h1>
        <p>Check the weather in different cities before traveling</p>
      </div>
      <div style={weatherInfoStyle}>
        <h2 style={cityStyle}>Weather in {city}</h2>
        <img src={`http://openweathermap.org/img/wn/${weather[0].icon}.png`} alt="Weather Icon" />
        <p style={tempStyle}>Temperature: {kelvinToCelsius(main.temp).toFixed(1)}°C (Feels like: {kelvinToCelsius(main.feels_like).toFixed(1)}°C)</p>
        <p style={conditionStyle}>Conditions: {weather[0].main} - {weather[0].description}</p>
      </div>
      <div style={buttonContainerStyle}>
        <button className="city-button" onClick={() => setCity('Tel Aviv')}>Tel Aviv</button>
        <button className="city-button" onClick={() => setCity('Jerusalem')}>Jerusalem</button>
        <button className="city-button" onClick={() => setCity('Haifa')}>Haifa</button>
        <button className="city-button" onClick={() => setCity('Dead Sea')}>Dead Sea</button>
      </div>
    </div>
  );
};

export default MyWeather;

// Inline styles
const containerStyle: React.CSSProperties = {
    marginTop: '30px',
    display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontFamily: 'Arial, sans-serif',
};

const headerStyle: React.CSSProperties = {
  marginBottom: '30px',
  textAlign: 'center',
};

// const titleStyle: React.CSSProperties = {
//   fontSize: '36px',
//   color: '#333',
// };

// const subtitleStyle: React.CSSProperties = {
//   fontSize: '18px',
//   color: '#555',
// };

const weatherInfoStyle: React.CSSProperties = {
  backgroundColor: '#f5f5f5',
  borderRadius: '10px',
  padding: '20px',
  marginBottom: '20px',
  textAlign: 'center',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

const cityStyle: React.CSSProperties = {
  marginTop: '0',
  fontSize: '24px',
  color: '#333',
};

const tempStyle: React.CSSProperties = {
  margin: '10px 0',
  fontSize: '18px',
  color: '#555',
};

const conditionStyle: React.CSSProperties = {
  margin: '10px 0',
  fontSize: '18px',
  color: '#555',
};

const buttonContainerStyle: React.CSSProperties = {
  display: 'flex',
  gap: '10px',
};

// const buttonStyle: React.CSSProperties = {
//   backgroundColor: '#007bff',
//   color: '#fff',
//   border: 'none',
//   borderRadius: '5px',
//   padding: '10px 20px',
//   cursor: 'pointer',
//   transition: 'background-color 0.3s ease',
//   fontSize: '16px',
// };

const loadingStyle: React.CSSProperties = {
  color: '#007bff',
  fontSize: '20px',
};
