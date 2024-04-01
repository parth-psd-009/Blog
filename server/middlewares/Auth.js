// const jwt = require("jsonwebtoken");
// const User = require("../models/User");
// const { catchAsyncError } = require("./CatchAsyncError");
// const { ErrorHandler } = require("../utils/ErrorHandler");

// const isAuthenticated = catchAsyncError(async (req, res, next) => {
//     const { token } = req.cookies;
//     // console.log(token);
//     if (!token) return next(new ErrorHandler("Not Logged In", 401));
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // console.log(decoded);
//     req.user = await User.findById(decoded._id);

//     next();
// });

// module.exports = {
//     isAuthenticated,
// };

const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { catchAsyncError } = require("./CatchAsyncError");

const isAuthenticated = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res
            .status(401)
            .json({ success: false, message: "Not Logged In" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded._id);
        next();
    } catch (error) {
        return res
            .status(401)
            .json({ success: false, message: "Invalid Token" });
    }
});

module.exports = {
    isAuthenticated,
};
