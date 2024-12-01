import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()


export const AuthProvider = ({ children }) => {
    const [isLogedIn, setIsLogedIn] = useState(false)
    const [user, setUser] = useState()

    useEffect(() => {
        const savedLogedInState = localStorage.getItem("isLogedIn")
        setIsLogedIn(savedLogedInState === "true")
    }, [])

    const login = () => {
        localStorage.setItem("isLogedIn", "true")
        setIsLogedIn(true)
    }

    const logout = () => {
        localStorage.setItem("isLogedIn", "false")
        setIsLogedIn(false)

    }


    return <AuthContext.Provider value={{ isLogedIn, login, logout }} >{children}</AuthContext.Provider>
}