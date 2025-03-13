# group1-revature-weather-tracking-project

# Project Setup Guide

## Prerequisites
Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [VS Code](https://code.visualstudio.com/download)
- [Python]()
- [Prometheus](https://prometheus.io/download/#prometheus)
- [Alertmanager](https://prometheus.io/download/#alertmanager)
- [Grafana](https://grafana.com/grafana/download?platform=windows)
### The following are needed if someone outside the group is running
- [Open Weather API Key](https://openweathermap.org)
- [Firebase Console Setup](https://console.firebase.google.com)

## Installation Steps

1. **Clone the Repository**

2. **Set Up Environment Variables**
   - Create a `.env` file in the root directory. (`weather-backend\.env`)
   - Frontend: Ensure that `firebaseConfig.jsx` contains the correct Firebase configuration keys. (`weather-frontend\src\firebaseConfig.jsx`)
   - Backend: Place the `serviceAccountKey.json` file in the appropriate directory and reference it correctly in your application. (`weather-backend\serviceAccountKey.json`)

3. **Install Dependencies**
   - Open command prompt in VS Code. Run the following commands to download the dependencies and run the React front-end.
   ```sh
   cd weather-frontend
   npm install
   npm install react-router-dom axios firebase
   npm install @mui/material @emotion/react @emotion/styled
   npm install axios
   npm run dev
   ```
   - Open command prompt. Run the following commands to create a virual environment to run the fastapi application.
   ```sh
   cd weather-backend
   python -m venv venv
   venv\Scripts\activate
   pip install fastapi uvicorn requests python-dotenv firebase-admin
   uvicorn main:app --host 0.0.0.0 --port 8000 --reload
   ```
   
4. **Run on port 5000**
   - Open command prompt in VS Code. Run the following commands to run the flask back-end.
   ```sh
   cd weather-backend
   venv\Scripts\activate
   pip install flask
   pip install flask_cors
   pip install prometheus_client
   python app.py
   ```
5. **Set up Prometheus and Alertmanager**
   - Extract the Prometheus zip to the Prometheus folder. Do not overwrite.
   - Extract the Alertmanager zip to the Alertmanager folder. Do not overwrite.
   - Run both `prometheus.exe` and `alertmanager.exe`

6. **Access the Application**
   - Access the main application at `http://localhost:5173`
   - Access Prometheus at `http://localhost:9090`
   - Access Alertmanager at `http://localhost:9093`
   - Access Prometheus Metrics at `http://localhost:5000/metrics`
   - Access Grafana at `http://localhost:3000`

---
