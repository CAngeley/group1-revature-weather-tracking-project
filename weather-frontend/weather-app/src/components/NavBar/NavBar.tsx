import React from "react";
import './NavBar.css'

const NavBar = () => {
    return (
        <>
            <nav className="navbar">
                <div className="navdiv">
                    <div className="logo">
                        <a href="#">THE WEATHER</a>
                    </div>

                    <ul>
                        <button><a href="#">Sign Up</a></button>
                        <button><a href="#">Log In</a></button>
                    </ul>
                </div>

            </nav>

        </>
    )
}

export default NavBar