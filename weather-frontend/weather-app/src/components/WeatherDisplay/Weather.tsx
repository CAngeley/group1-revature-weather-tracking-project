import React from 'react'
import './Weather.css'
import clear_icon from '../../assets/clear.png'
import cloudy_icon from '../../assets/cloudy.png'
import drizzle_icon from '../../assets/drizzle.png'
import humidity_icon from '../../assets/humidity.png'
import rainy_icon from '../../assets/rainy.png'
import snow_icon from '../../assets/snow.png'
import thunder_icon from '../../assets/thunder.png'
import wind_icon from '../../assets/wind.png'

import SearchBar from '../Searchbar/SearchBar'

const Weather = () => {
    return (
        <div className='weather'>
            
            <h1 className="location">Country Name</h1>
            <img src={clear_icon} alt="" className='weather-icon'/>
            <p className='temperature'>72°F</p>
            <p className='note'>It's a nice day!</p>
            <div className='weather-data'>
                <div className='col'>
                    <img src={humidity_icon} alt="" />
                    <div>
                        <p>91 %</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className='col'>
                    <img src={wind_icon} alt="" />
                    <div>
                        <p>36 Km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather