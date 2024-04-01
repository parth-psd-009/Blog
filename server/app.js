const express = require("express");
const cors = require("cors");
const app = express();
const { config } = require("dotenv");
require("dotenv").config();
const PORT = process.env.PORT || 4000;
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/db");

// INTERNAL IMPORTS
const userRoutes = require("./routes/UserRoutes");
const blogRoutes = require("./routes/BloggingRoutes");

config({
    path: "./config/config.env",
});

connectDB();

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "*",
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Welcome",
    });
});

app.listen(PORT, () => {
    console.log(`Server up on port ${PORT}`);
});
