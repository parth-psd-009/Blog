import React from "react";
import { FiMenu } from "react-icons/fi"; // Importing the hamburger menu icon
import Logo from "../../assets/Logo.svg";
import { Link } from "react-router-dom";
import "./Header.styles.css";
import CustomButton from "../CustomButton/CustomButton.component";
import { useAuthContext } from "../../contexts/AuthContext";
import LogoutButton from "../LogoutButton/LogoutButton.component";
import ProfileIcon from "../ProfileIcon/ProfileIcon.component";
// const CustomButton = ({ bgColor, textColor, text, to }) => {
//     const customClass = `custom-btn bg-${bgColor} text-${textColor}`;
//     return (
//         <button className="custon-btn bg-white text-black">
//             <Link to={to}>{text}</Link>
//         </button>
//     );
// };

const Header = () => {
    const { isAuthenticated, userData } = useAuthContext();
    return (
        <div className="header-div py-4 px-6 md:px-12 xl:px-24">
            <div className="mx-auto flex justify-between items-center max-w-screen-xl">
                <Link to="/" className="text-white">
                    <img src={Logo} className="h-8" alt="Logo" />
                </Link>
                <div className="hidden md:flex space-x-12">
                    <Link to="/about" className="text-white">
                        About
                    </Link>
                    <Link to="/explore" className="text-white">
                        Explore
                    </Link>
                    {!isAuthenticated && (
                        <Link to="/login" className="text-white">
                            Login
                        </Link>
                    )}
                    {isAuthenticated && <LogoutButton />}
                    {isAuthenticated && (
                        <Link to="/dashboard">
                            <ProfileIcon name={userData.username} />
                        </Link>
                    )}
                    {!isAuthenticated && (
                        <CustomButton
                            to="/register"
                            text="Register"
                            textColor="black"
                            bgColor="white"
                        />
                    )}
                </div>
                {/* hamburger */}
                <div className="md:hidden">
                    <FiMenu className="text-white text-2xl fill-current" />
                </div>
            </div>
        </div>
    );
};

export default Header;
