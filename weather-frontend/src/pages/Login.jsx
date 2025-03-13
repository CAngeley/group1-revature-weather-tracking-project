import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar/NavBar";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/home");
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        
        <div className="login-body">
             <Navbar />
            <div className="login-page">
                <div className="login-box">
                    {error && <p>{error}</p>}
                    <form onSubmit={handleLogin}>
                        <h2>Login</h2>
                        <div className="input-box">
                            <input type="email" value={email} placeholder="" onChange={(e) => setEmail(e.target.value)} required />
                            <label>Email</label>
                        </div>
                        <div className="input-box">
                            <input type="password" value={password} placeholder="" onChange={(e) => setPassword(e.target.value)} required />
                            <label>Password</label>
                        </div>
                        <button type="submit">Login</button>
                    </form>
                    <p>Don't have an account? <a href="/signup">Sign Up</a></p>
                </div>
            </div>
        </div>
    );
}

export default Login;