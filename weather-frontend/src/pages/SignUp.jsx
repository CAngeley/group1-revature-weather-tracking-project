import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar/NavBar";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/home");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        
        <div className="signup-body">     
            <Navbar />
            <div className="signup-page">    
                <div className="signup-box">
                    {error && <p>{error}</p>}
                    <form onSubmit={handleSignup}>
                        <h2>Sign Up</h2>
                        <div className="input-box">
                            <input type="email" value={email} placeholder="" onChange={(e) => setEmail(e.target.value)} required />
                            <label>Email</label>
                        </div>
                        <div className="input-box">
                            <input type="password" value={password} placeholder="" onChange={(e) => setPassword(e.target.value)} required />
                            <label>Password</label>
                        </div>
                        <button type="submit">Sign Up</button>
                    </form>
                    <p>Already have an account? <a href="/login">Login</a></p>
                </div>
            </div>
        </div>
    );
}

export default Signup;