import React from "react";
import { Link } from "react-router-dom";
import "./CustomButton.styles.css";

const CustomButton = ({ bgColor, textColor, text, to, type = "button" }) => {
    return (
        <button
            className="custon-btn"
            type={type}
            style={{ backgroundColor: bgColor, color: textColor }}
        >
            <Link to={to}>{text}</Link>
        </button>
    );
};

export default CustomButton;
