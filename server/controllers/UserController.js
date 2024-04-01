// const express = require("express");
// const { z } = require("zod");
// const bcrypt = require("bcrypt");

const {
    userRegistrationSchema,
    // userLoginSchema, // not necessary
} = require("../middlewares/InputValidation");
const User = require("../models/User");
const { sendJwtToken } = require("../utils/SendJwt");
const { catchAsyncError } = require("../middlewares/CatchAsyncError");
// const { ErrorMiddleware } = require("../middlewares/ErrorMiddleware"); //To add this later

// REGISTER CONTROLLER

const registerController = catchAsyncError(async (req, res, next) => {
    let userData;
    try {
        userData = userRegistrationSchema.parse(req.body);
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({
            success: false,
            message: `User input not valid.`,
        });
    }
    const existingUser =
        (await User.findOne({
            username: userData.username,
        })) ||
        (await User.findOne({
            email: userData.email,
        }));

    // USER ALREADY EXISTS

    if (existingUser) {
        console.log("User already exists with email or username");
        return res.status(409).json({
            success: false,
            message: `Username or email is already taken. Please choose a different username.`,
        });
    }

    // const hashedPassword = await bcrypt.hash(userData.password, 10);
    if (userData.password !== userData.confirmPassword) {
        console.log("Passwords do not match");
        return res.status(422).json({
            success: false,
            message: `Passwords do not match`,
        });
    }
    const newUser = await User.create({
        username: userData.username,
        email: userData.email,
        password: userData.password,
    });
    // console.log(newUser.password);
    await newUser.save();
    sendJwtToken(
        res,
        newUser,
        ` ${newUser.username} Registered Successfully`,
        201
    );
});

const loginController = catchAsyncError(async (req, res, next) => {
    const userData = req.body;
    if (!userData.username && !userData.email) {
        return res.status(400).json({
            success: false,
            message: "Please enter either email or username",
        });
    }
    if (!userData.password) {
        return res.status(400).json({
            success: false,
            message: "Please enter the password",
        });
    }

    let existingUser;
    if (userData.username) {
        existingUser = await User.findOne({
            username: userData.username,
        }).select("+password");
    } else {
        existingUser = await User.findOne({ email: userData.email }).select(
            "+password"
        );
    }

    if (!existingUser) {
        return res.status(404).json({
            success: false,
            message: "User not found. Please check your credentials.",
        });
    }

    const passwordMatch = await existingUser.comparePassword(userData.password);

    if (!passwordMatch) {
        return res.status(401).json({
            success: false,
            message: "Incorrect password or username/email. Please try again.",
        });
    }
    let userToReturn;
    if (userData.username) {
        userToReturn = await User.findOne({
            username: userData.username,
        });
    } else {
        userToReturn = await User.findOne({ email: userData.email });
    }

    sendJwtToken(
        res,
        existingUser,
        `Welcome back ${existingUser.username}`,
        200
    );
});

const logoutController = catchAsyncError(async (req, res, next) => {
    res.status(200)
        .cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })
        .json({
            success: true,
            message: "Logged Out Successfully",
        });
});

const getMyProfileController = catchAsyncError(async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        res.status(200).json({
            success: true,
            user,
        });
        console.log(user);
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Error",
        });
    }
});

module.exports = {
    registerController,
    loginController,
    getMyProfileController,
    logoutController,
};
