import React from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./LogoutButton.styles.css";
import axios from "axios";

const LogoutButton = () => {
    const { setIsAuthenticatedFalse } = useAuthContext();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            // Make a POST request to the logout endpoint
            await axios.get("http://localhost:4000/api/v1/user/logout");

            // Update the authentication state
            setIsAuthenticatedFalse();

            // Redirect to the home page
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error.message);
            // Optionally, you can show an error message to the user
        }
    };

    return (
        <button
            className="logout-btn bg-white text-black"
            onClick={logoutHandler}
        >
            Logout
        </button>
    );
};

export default LogoutButton;
