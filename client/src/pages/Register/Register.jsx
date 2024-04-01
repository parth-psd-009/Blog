import React, { useState } from "react";
import "./Register.styles.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LabelInput from "../../components/LabelInput/LabelInput.component";
import { useAuthContext } from "../../contexts/AuthContext";

// const LabelInput = ({
//     type,
//     name,
//     id,
//     placeholder,
//     label,
//     value,
//     onChangeHandler,
// }) => {
//     return (
//         <div className="label-input">
//             <label htmlFor={id}>{label}</label>
//             <input
//                 type={type}
//                 name={name}
//                 value={value}
//                 id={id}
//                 placeholder={placeholder}
//                 className="input-field"
//                 onChange={onChangeHandler}
//             />
//         </div>
//     );
// };

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    const { isAuthenticated, setIsAuthenticatedTrue, setIsAuthenticatedFalse } =
        useAuthContext();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        console.log(formData);
    };

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            // console.log(formData);
            const response = await axios.post(
                "http://localhost:4000/api/v1/user/register",
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status == 201) {
                const token = response.data.token;
                if (token) {
                    // set token in local storage
                    // localStorage.setItem("token", token);
                    // document.cookie = `token=${token}`;
                    console.log(token);
                }
                setIsAuthenticatedTrue();
                console.log(isAuthenticated);
                navigate("/dashboard");
            } else if (response.status == 409) {
                console.log("User already exists with given username or email");
            } else if (response.status == 422) {
                console.log("Password and confirm password do not match");
            } else {
                console.log("Register failed");
            }
        } catch (error) {
            console.log("Error: ", error.message);
        }
    };
    return (
        <form
            className="form-div flex flex-col pt-20"
            method="POST"
            // action="http://localhost:4000/api/v1/user/register"
        >
            <LabelInput
                type="text"
                name="username"
                id="username"
                placeholder="Username"
                label="Username"
                value={formData.username}
                onChangeHandler={handleChange}
            />
            <LabelInput
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                label="Email"
                value={formData.email}
                onChangeHandler={handleChange}
            />
            <LabelInput
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                label="Password"
                value={formData.password}
                onChangeHandler={handleChange}
            />
            <LabelInput
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                label="Confirm Password"
                value={formData.confirmPassword}
                onChangeHandler={handleChange}
            />
            <button
                className="submit-btn bg-black text-white"
                type="submit"
                onClick={submitHandler}
            >
                Register
            </button>
        </form>
    );
};

export default Register;
