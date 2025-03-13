from fastapi import FastAPI, HTTPException, Depends, Header
from fastapi.middleware.cors import CORSMiddleware
import requests
import firebase_admin
from firebase_admin import auth, credentials
from dotenv import load_dotenv
import os

load_dotenv()

cred = credentials.Certificate("serviceAccountKey.json")
firebase_admin.initialize_app(cred)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

WEATHER_API_KEY = os.getenv("WEATHER_API_KEY")

def verify_token(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="No authentication token provided")

    token = authorization.split("Bearer ")[-1]
    
    try:
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except:
        raise HTTPException(status_code=401, detail="Invalid authentication token")

@app.get("/weather")
def get_weather(cities: str, user_data: dict = Depends(verify_token)):
    city_list = cities.split(",")
    weather_data = []
    requests.post(url= "http://localhost:5000/weather", json={"cities":city_list} )
    for city in city_list:
        url = f"http://api.openweathermap.org/data/2.5/weather?q={city.strip()}&appid={WEATHER_API_KEY}&units=metric"
        response = requests.get(url)
        if response.status_code == 200:
            weather_data.append(response.json())
        else:
            weather_data.append({"city": city, "error": "Could not fetch data"})

    return weather_data