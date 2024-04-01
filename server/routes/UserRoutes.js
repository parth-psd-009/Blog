const express = require("express");
const router = express.Router();
const {
    registerController,
    loginController,
    logoutController,
    getMyProfileController,
} = require("../controllers/UserController");
const { isAuthenticated } = require("../middlewares/Auth");

// register signup and logout
router.route("/register").post(registerController);
router.route("/login").post(loginController);
router.route("/logout").get(logoutController);
router.route("/profile").get(isAuthenticated, getMyProfileController);

// REMAINING
// router.route("/resetpassword").post(resetPasswordController);

//

module.exports = router;
