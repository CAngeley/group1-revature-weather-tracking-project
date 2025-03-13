import React, { useState, useEffect } from 'react';
import Navbar from '../components/NavBar/NavBar';
import { useAuth } from '../AuthContext';
import axios from 'axios';
import search_icon from '../assets/search_icon.png';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent, TextField } from '@mui/material';

function Home() {
    const { currentUser } = useAuth();
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    const getRecommendations = (weather) => {
        if (!weather || !weather.main) return "No recommendations available.";

        const temp = weather.main.temp;
        const wind = weather.wind.speed;
        const description = weather.weather[0].description;

        let recommendation = "🌤️ Enjoy your day!";

        if (temp < 5) recommendation = "🧥 Wear warm clothes, it's freezing!";
        else if (temp >= 5 && temp <= 15) recommendation = "🧣 A light jacket is recommended.";
        else if (temp > 15 && temp <= 30) recommendation = "😎 Enjoy the weather!";
        else if (temp > 30) recommendation = "🥵 Stay hydrated, it's hot!";
        if (wind > 10) recommendation += " 💨 Strong winds! Secure loose items.";
        if (description.includes("rain")) recommendation += " ☔ Don't forget your umbrella!";
        if (description.includes("snow")) recommendation += " ❄️ Drive safely, it's snowy!";

        return recommendation;
    };

    const fetchWeather = async () => {
        if (city.trim() === '') {
            setError('Please enter a city name.');
            return;
        }

        setError('');
        setWeatherData(null);

        try {
            const token = await currentUser.getIdToken();
            const response = await axios.get(`http://localhost:8000/weather?city=${city}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.status === 200 && response.data && !response.data.error) {
                setWeatherData(response.data);
            } else if (response.data && response.data.error) {
                setError(response.data.error);
            } else {
                setError('Unexpected error occurred. Please try again.');
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.error) {
                setError(err.response.data.error);
            } else {
                setError('Error fetching weather data. Please try again later.');
            }
            console.error(err);
        }
    };

    return (
        <div className='home-page'>
            <Navbar />
            <div className="weather-container">

                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Enter city name"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <img src={search_icon} alt="Search" width={20} onClick={fetchWeather} />
                </div>

                {error && <p className="error">{error}</p>}

                {weatherData && (
                    <div className="weather-card">
                        <p className='city-temperature'>{Math.round(weatherData.main.temp)}°C</p>
                        <h2 className='city-name'>{weatherData.name}</h2>
                        <p className='city-info'>🥶 Feels Like: {weatherData.main.feels_like}°C</p>
                        <p className='city-info'>💧 Humidity: {weatherData.main.humidity}%</p>
                        <p className='city-info'>☁️ Conditions: {weatherData.weather[0].description}</p>
                        <p className='city-info'>🌬️ Wind Speed: {weatherData.wind.speed} m/s</p>
                        <p className='city-info'>🧭 Pressure: {weatherData.main.pressure} hPa</p>
                        <p className='city-info'>👁️ Visibility: {weatherData.visibility / 1000} km</p>
                        <p className='city-info'>🌅 Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
                        <p className='city-info'>🌇 Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
                        <p className="recommendation">{getRecommendations(weatherData)}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Home;