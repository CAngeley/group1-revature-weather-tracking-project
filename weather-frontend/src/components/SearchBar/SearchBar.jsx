import React from "react";
import search_icon from '../../assets/search_icon.png'
import './SearchBar.css'

const SearchBar = () => {

    return (
        <div className="search-bar">
            <input type="text" placeholder="Search"/>
            <img src={search_icon} alt="" />
        </div>
    );
};

export default SearchBar;