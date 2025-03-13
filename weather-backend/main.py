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
def get_weather(city: str):
    try:
        url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={WEATHER_API_KEY}&units=metric"
        print(f"Request URL: {url}")  # Debugging: Print the URL

        response = requests.get(url)
        print(f"Response Status Code: {response.status_code}")  # Debugging: Print status code
        print(f"Response Content: {response.text}")  # Debugging: Print the response content

        # Check if the request was successful
        if response.status_code == 200:
            return response.json()
        else: 
            return {"error": "City not found. Please enter a valid city name."}

    except requests.RequestException as e:
        return {"error": f"An error occurred while fetching weather data: {str(e)}"}