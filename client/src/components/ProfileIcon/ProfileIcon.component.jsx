import React from "react";
import "./Profile.styles.css";

const ProfileIcon = ({ name }) => {
    return (
        <div
            className="rounded-full text-2xl color-white border-2 px-4 py-2 flex items-center align-middle"
            style={{ color: "white" }}
        >
            {name.slice(0, 2)}
        </div>
    );
};

export default ProfileIcon;
