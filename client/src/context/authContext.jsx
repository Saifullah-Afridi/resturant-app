import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogedIn, setIsLogedIn] = useState(false); // Default to false
    const [user, setUser] = useState(null); // Default to null to avoid confusion

    // Load saved login state and user data on first load
    useEffect(() => {
        const savedLogedInState = JSON.parse(localStorage.getItem("isLogedIn")); // Parse as boolean
        const savedUserData = localStorage.getItem("user");

        setIsLogedIn(savedLogedInState || false); // Default to false if not found
        setUser(savedUserData ? JSON.parse(savedUserData) : null); // Default to null if no user
    }, []);

    const login = (userData) => {
        localStorage.setItem("isLogedIn", JSON.stringify(true)); // Store as boolean string
        localStorage.setItem("user", JSON.stringify(userData)); // Store user as stringified JSON

        setIsLogedIn(true);
        setUser(userData);
    };

    const logout = () => {
        localStorage.setItem("isLogedIn", JSON.stringify(false)); // Set login state to false
        localStorage.removeItem("user"); // Clear user data

        setIsLogedIn(false);
        setUser(null); // Reset user state
    };

    return (
        <AuthContext.Provider value={{ isLogedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
