import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setIsAuthenticatedTrue = () => {
        setIsAuthenticated(true);
    };

    const setIsAuthenticatedFalse = () => {
        setIsAuthenticated(false);
    };

    useEffect(() => {
        try {
            const user = axios.get("http://localhost:4000/api/v1/user/profile");
            if (user) {
                setIsAuthenticated(true);
            }
        } catch (e) {
            setIsAuthenticated(false);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticatedTrue,
                setIsAuthenticatedFalse,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
