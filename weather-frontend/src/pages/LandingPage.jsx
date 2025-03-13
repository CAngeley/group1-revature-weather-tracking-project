import React from "react";
import { useEffect } from 'react';
import Navbar from "../components/NavBar/NavBar";

const LandingPage = () => {

    useEffect(() => {
        document.title = "Nimbus - Homepage";
      }
    );

    return (
        <>
            <body className="landingpage">
    
                <Navbar />

                <h1>WELCOME</h1> 
                <p>Login to use our weather app</p>   

            </body>
            

        </>
    );
};

export default LandingPage;