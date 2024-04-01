const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: validator.isEmail,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        min: [8, "Password must be at least 8 characters"],
        select: false,
    },
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog",
        },
    ],
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

userSchema.methods.comparePassword = async function (password) {
    // console.log("Received password:", password);
    // console.log("Stored hashed password:", this.password);
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.getJWTToken = function () {
    const x = jwt.sign(
        { _id: this._id, username: this.username, email: this.email },
        process.env.JWT_SECRET,
        {
            expiresIn: "15d",
        }
    );
    return x;
};

module.exports = mongoose.model("User", userSchema);
