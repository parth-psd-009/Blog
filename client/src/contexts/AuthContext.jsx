import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState("");

    const setIsAuthenticatedTrue = () => {
        setIsAuthenticated(true);
    };

    const setIsAuthenticatedFalse = () => {
        setIsAuthenticated(false);
        setUserData(""); // Set userData to null when user is not authenticated
    };

    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.get(
                        "http://localhost:4000/api/v1/user/profile",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    if (response) {
                        setUserData(response.data.user);
                        setIsAuthenticated(true);
                    }
                } catch (error) {
                    console.log(error);
                    setIsAuthenticatedFalse(); // Call setIsAuthenticatedFalse when error occurs
                }
            } else {
                setIsAuthenticatedFalse(); // Call setIsAuthenticatedFalse when token is not present
            }
        };

        checkLoggedIn();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticatedTrue,
                setIsAuthenticatedFalse,
                userData,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
