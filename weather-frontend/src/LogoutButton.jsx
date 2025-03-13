import React from "react";
import { Button } from "@mui/material";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const LogoutButton = ({ setAuthenticated }) => {
    const handleLogout = async () => {
        await signOut(auth);
        setAuthenticated(false);
        alert("Logged out!");
    };

    return (
        <Button variant="contained" color="secondary" onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default LogoutButton;