import React from "react";
import { useAuthContext } from "../../contexts/AuthContext";

const Dashboard = () => {
    const { isAuthenticated } = useAuthContext();
    console.log(isAuthenticated);
    return <div>Dashboard</div>;
};

export default Dashboard;
