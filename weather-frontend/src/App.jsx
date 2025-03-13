import React from 'react';
import Signup from './SignUp';
import Login from './Login';
import Home from './Home';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './AuthContext';
import { Route, Router, Routes } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App;