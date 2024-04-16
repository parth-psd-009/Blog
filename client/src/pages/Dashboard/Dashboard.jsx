import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import "./Dashboard.styles.css";
import BlogDisplay from "../../components/BlogDisplay/BlogDisplay";
import axios from "axios";

const Dashboard = () => {
    const { isAuthenticated, userData } = useAuthContext();
    const [blogsArray, setBlogsArray] = useState([]);

    // useEffect(() => {
    //     if (userData.blogs) {
    //         setBlogsArray(userData.blogs.map((blog, index) => blog));
    //     }
    // }, [userData.blogs]);

    useEffect(() => {
        const fetchBlogs = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.get(
                        "http://localhost:4000/api/v1/blog/blogs",
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    if (response) {
                        setBlogsArray(response.data.blogs);
                        console.log(response.data.blogs);
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log("No Token");
            }
        };

        fetchBlogs();
    }, []);
    return (
        <div className="dashboard-container py-8 pt-20 px-16">
            <h1 className="mb-10 font-bold text-white leading-snug my-3">
                Hi {userData.username}!
            </h1>
            {blogsArray.length > 0 ? (
                <div>
                    <h2 className="text-2xl text-white text-left">
                        Your writings
                    </h2>
                    {blogsArray.map((blog, index) => (
                        <BlogDisplay key={index} blog={blog} />
                    ))}
                </div>
            ) : (
                <p className="text-white">You don't have any blogs yet.</p>
            )}
        </div>
    );
};

export default Dashboard;
