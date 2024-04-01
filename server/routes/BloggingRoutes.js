const express = require("express");
const router = express.Router();
const {
    createBlogController,
    // editBlogController,
} = require("../controllers/BlogController");
const { isAuthenticated } = require("../middlewares/Auth");

// CREATE AND EDIT BLOG ROUTES
router.route("/createblog").post(isAuthenticated, createBlogController);

// router.route("/editblog/:blogid").put(editBlogController);

module.exports = router;
