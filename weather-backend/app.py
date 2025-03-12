from flask import Flask, request, jsonify
import requests
from prometheus_client import Gauge, generate_latest, CollectorRegistry, CONTENT_TYPE_LATEST
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Create a new registry for Prometheus
registry = CollectorRegistry()

# Define Prometheus Gauges in the custom registry
weather_temperature = Gauge("weather_temperature", "Temperature in Celsius", ["city"], registry=registry)
weather_humidity = Gauge("weather_humidity", "Humidity percentage", ["city"], registry=registry)
weather_wind_speed = Gauge("weather_wind_speed", "Wind speed in m/s", ["city"], registry=registry)
weather_pressure = Gauge("weather_pressure", "Atmospheric pressure in hPa", ["city"], registry=registry)

# OpenWeather API Config
API_KEY = "8928040ad74083e2c6a73017101a89b3"
BASE_URL = "http://api.openweathermap.org/data/2.5/weather"

# Store latest weather metrics
latest_weather_data = {}

@app.route('/weather', methods=['POST'])
def get_weather():
    global latest_weather_data  # Store latest metrics
    
    data = request.json
    cities = data.get("cities", [])

    if not cities:
        return jsonify({"error": "No cities provided"}), 400

    updated_data = {}  # Temporary dictionary to store new data

    for city in cities:
        response = requests.get(f"{BASE_URL}?q={city}&appid={API_KEY}&units=metric")
        
        if response.status_code == 200:
            weather_data = response.json()
            temp = weather_data["main"]["temp"]
            humidity = weather_data["main"]["humidity"]
            wind_speed = weather_data["wind"]["speed"]
            pressure = weather_data["main"]["pressure"]

            # Store metrics in the dictionary
            updated_data[city] = {
                "temperature": temp,
                "humidity": humidity,
                "wind_speed": wind_speed,
                "pressure": pressure,
            }

            # Update Prometheus metrics
            weather_temperature.labels(city=city).set(temp)
            weather_humidity.labels(city=city).set(humidity)
            weather_wind_speed.labels(city=city).set(wind_speed)
            weather_pressure.labels(city=city).set(pressure)

            print(f"✅ Updated metrics for {city}: Temp={temp}, Humidity={humidity}, Wind={wind_speed}, Pressure={pressure}")  
        else:
            print(f"❌ Failed to fetch weather for {city}: {response.status_code}")

    # Store the latest weather data
    latest_weather_data = updated_data

    return jsonify({"message": "Weather data updated successfully"}), 200

@app.route('/metrics')
def metrics():
    """Expose Prometheus metrics"""
    return generate_latest(registry), 200, {'Content-Type': CONTENT_TYPE_LATEST}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)