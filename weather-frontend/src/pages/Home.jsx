// Frontend - Home.js
import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import axios from 'axios';
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
        <Container>
        <Typography variant="h5" style={{ margin: '20px 0' }}>Weather Lookup</Typography>
        <TextField
            label="Enter city name"
            variant="outlined"
            fullWidth
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{ marginBottom: '20px' }}
        />
        <Button variant="contained" color="primary" onClick={fetchWeather} style={{ marginBottom: '20px' }}>
            Get Weather
        </Button>
        {error && <Typography color="error">{error}</Typography>}
        {weatherData && (
            <Card style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f3f3f3' }}>
                <CardContent>
                    <Typography variant="h6" style={{ fontWeight: "bold" }}>
                        {weatherData.name}
                    </Typography>
                    <Typography>🌡️ <strong>Temperature:</strong> {weatherData.main.temp}°C</Typography>
                    <Typography>🥶 <strong>Feels Like:</strong> {weatherData.main.feels_like}°C</Typography>
                    <Typography>💧 <strong>Humidity:</strong> {weatherData.main.humidity}%</Typography>
                    <Typography>☁️ <strong>Conditions:</strong> {weatherData.weather[0].description}</Typography>
                    <Typography>🌬️ <strong>Wind Speed:</strong> {weatherData.wind.speed} m/s</Typography>
                    <Typography>🧭 <strong>Pressure:</strong> {weatherData.main.pressure} hPa</Typography>
                    <Typography>👁️ <strong>Visibility:</strong> {weatherData.visibility / 1000} km</Typography>
                    <Typography>🌅 <strong>Sunrise:</strong> {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</Typography>
                    <Typography>🌇 <strong>Sunset:</strong> {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</Typography>
                    {/* Floating Recommendation Panel */}
                    <div style={{
                        background: "#ffcc00", color: "#333", padding: "10px 15px",
                        borderRadius: "10px", fontSize: "15px", marginTop: "15px",
                        textAlign: "center", fontWeight: "bold"
                    }}>
                        {getRecommendations(weatherData)}
                    </div>
                </CardContent>
            </Card>
        )}
    </Container>

    );
}

export default Home;




        