import { useState } from 'react'
import './App.css'
import SearchBar from './components/Searchbar/SearchBar'
import Weather from './components/WeatherDisplay/Weather'
import NavBar from './components/NavBar/NavBar'

function App() {

  return (
    <>
    <NavBar />
    <SearchBar />
    <Weather />
    </>
  )
}

export default App
