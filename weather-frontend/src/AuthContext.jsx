import React, { useContext, useState, useEffect } from "react";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";


const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}


export const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};


export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    function logout() {
        return signOut(auth);
    }

    const value = { currentUser, logout };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}