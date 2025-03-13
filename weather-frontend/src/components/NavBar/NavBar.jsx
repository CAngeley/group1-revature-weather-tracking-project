import React from "react";
import './NavBar.css';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

const Navbar = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <nav className="navbar">
            <div className="navdiv">
                <div className="logo">
                    <a href="/">Nimbus</a>
                </div>
                <ul>
                    {currentUser ? (
                        <>
                            <a href="/home"><button className="login">Weather</button></a>
                            <a href="http://localhost:9090"><button className="login">Prom</button></a>
                            <a href="http://localhost:9093"><button className="login">Alert</button></a>
                            <a href="http://localhost:5000/metrics"><button className="login">Metrics</button></a>
                            <a href="http://localhost:3000"><button className="login">Grafana</button></a>
                            <button className="login" onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <a href="/login"><button className="login">Login</button></a>
                            <a href="/signup"><button className="signup">Sign Up</button></a>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;