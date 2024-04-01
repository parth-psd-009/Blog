const jwt = require("jsonwebtoken");

const sendJwtToken = (res, user, message, statusCode = 200) => {
    const token = user.getJWTToken();
    // console.log(token);
    console.log("Token sent");
    const options = {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
        sameSite: "none",
    };

    res.status(statusCode)
        .cookie("token", token, options)
        .json({
            success: true,
            message: message || `${user.username} registered successfully`,
            user,
            token: token,
        });
};

module.exports = { sendJwtToken };
