import React from "react";
import { Link } from "react-router-dom";
import "./Home.styles.css";
import CustomButton from "../../components/CustomButton/CustomButton.component";

// const CustomButton = ({ bgColor, textColor, text, to }) => {
//     const customClass = `custom-btn bg-${bgColor} text-${textColor}`;
//     return (
//         <button className="custom-btn bg-black text-white mx-auto">
//             <Link to={to}>{text}</Link>
//         </button>
//     );
// };

const Home = () => {
    return (
        <div className="home-container py-8 pt-20">
            <div className="flex flex-col justify-around sm:flex-row">
                <div className="sm:w-full md:w-1/3 lg:w-1/4 text-center sm:text-left">
                    <h1 className="font-bold text-black leading-snug my-3">
                        Welcome to Large
                    </h1>
                    <h2 className="font-normal text-xl text-black leading-snug my-3">
                        Express your thoughts and views freely
                    </h2>
                    <CustomButton
                        to="/explore"
                        text="Get Started"
                        textColor="white"
                        bgColor="black"
                    />
                </div>
                <div className="sm:w-full md:w-1/3 lg:w-1/4 text-center sm:text-left">
                    <h1 className="font-semibold text-4xl text-white leading-snug my-3">
                        Explore a Variety of Topics
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default Home;
