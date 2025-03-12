import React from "react";
import './SearchBar.css'
import search_icon from "../../assets/search.png"

const SearchBar = () => {
    return (
        <>
        
        <div className="search-bar"> 
            <input type="text" placeholder="search"/>
            <img src={search_icon} alt="" />
        </div>
        </>
    )
}

export default SearchBar