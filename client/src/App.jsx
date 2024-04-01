import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Header from "./components/Header/Header.component";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";

import { AuthProvider } from "./contexts/AuthContext";

function App() {
    return (
        <ChakraProvider>
            <AuthProvider>
                <BrowserRouter>
                    <Header />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </ChakraProvider>
    );
}

export default App;
