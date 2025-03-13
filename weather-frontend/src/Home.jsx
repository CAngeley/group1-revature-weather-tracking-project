import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent, Chip } from "@mui/material";

const cityOptions = [
    "New York", "London", "Tokyo", "Paris", "Berlin",
    "Dubai", "Sydney", "Mumbai", "Toronto", "San Francisco"
];

function Home() {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [selectedCities, setSelectedCities] = useState([]);
    const [weatherData, setWeatherData] = useState([]);
    const [error, setError] = useState("");

    const toggleCitySelection = (city) => {
        setSelectedCities((prev) =>
            prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
        );
    };

    const fetchWeather = async () => {
        if (selectedCities.length < 3) {
            setError("Please select at least 3 cities.");
            return;
        }

        setError("");
        try {
            const token = await currentUser.getIdToken();
            const response = await axios.get(`http://localhost:8000/weather?cities=${selectedCities.join(",")}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setWeatherData(response.data);
        } catch (err) {
            setError("Error fetching weather data");
            console.error(err);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate("/login");
    };

    const getRecommendations = (weather) => {
        if (!weather || !weather.main) return "No recommendations available.";

        const temp = weather.main.temp;
        const wind = weather.wind.speed;

        if (temp < 5) return "🧥 Wear warm clothes, it's freezing!";
        if (temp >= 5 && temp <= 15) return "🧣 A light jacket is recommended.";
        if (temp > 15 && temp <= 30) return "😎 Enjoy the weather!";
        if (temp > 30) return "🥵 Stay hydrated, it's hot!";
        if (wind > 10) return "💨 Strong winds! Secure loose items.";

        return "🌤️ Enjoy your day!";
    };

    return (
        <Container>
            {/* Navbar */}
            <AppBar position="static">
                <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="h6">Weather Tracker</Typography>
                    <div>
                        <Typography variant="body1" style={{ marginRight: "20px", display: "inline" }}>
                            👤 {currentUser?.email}
                        </Typography>
                        <Button variant="contained" color="error" onClick={handleLogout}>
                            Logout
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>

            {/* City Selection */}
            <Typography variant="h5" style={{ margin: "20px 0" }}>
                Select at least 3 cities:
            </Typography>
            <Grid container spacing={2} style={{ marginBottom: "20px" }}>
                {cityOptions.map((city) => (
                    <Grid item key={city}>
                        <Chip
                            label={city}
                            onClick={() => toggleCitySelection(city)}
                            color={selectedCities.includes(city) ? "primary" : "default"}
                            clickable
                        />
                    </Grid>
                ))}
            </Grid>

            <Button variant="contained" color="primary" onClick={fetchWeather} style={{ marginBottom: "20px" }}>
                Get Weather
            </Button>

            {error && <Typography color="error">{error}</Typography>}

            {/* Weather Data */}
            <Grid container spacing={3}>
                {weatherData.map((weather, index) => (
                    <Grid item xs={12} md={4} key={index}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{weather.name || weather.city}</Typography>
                                {weather.error ? (
                                    <Typography color="error">{weather.error}</Typography>
                                ) : (
                                    <>
                                        <Typography>🌡️ Temperature: {weather.main.temp}°C</Typography>
                                        <Typography>💧 Humidity: {weather.main.humidity}%</Typography>
                                        <Typography>☁️ Conditions: {weather.weather[0].description}</Typography>
                                        <Typography>🌬️ Wind Speed: {weather.wind.speed} m/s</Typography>
                                        <Typography>🧭 Pressure: {weather.main.pressure} hPa</Typography>
                                        <Typography>👁️ Visibility: {weather.visibility / 1000} km</Typography>
                                        <Typography>🌅 Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</Typography>
                                        <Typography>🌇 Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</Typography>
                                    </>
                                )}

                                {/* Floating Recommendation Panel */}
                                <div style={{
                                    background: "#ffcc00", color: "#333", padding: "5px 10px",
                                    borderRadius: "5px", fontSize: "14px", marginTop: "10px"
                                }}>
                                    {getRecommendations(weather)}
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

export default Home;