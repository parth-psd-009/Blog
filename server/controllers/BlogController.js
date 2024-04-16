const express = require("express");

const { catchAsyncError } = require("../middlewares/CatchAsyncError"); //To add this later
const Blog = require("../models/Blog");
const User = require("../models/User");

const createBlogController = catchAsyncError(async (req, res, next) => {
    const blogData = req.body;
    const user = await User.findById(req.user._id);
    if (!blogData.title || !blogData.content) {
        return res.status(400).json({
            success: false,
            message: "Please enter all required fields",
        });
    }

    // BLOGDATA : TITLE, {DESC}, {[TOPICS]}, [content(text, image)]

    const newBlog = new Blog({
        title: blogData.title,
        description: blogData.description,
        topics: blogData.topics,
        content: blogData.content,
        thumbnail: blogData.thumbnail,
        creator: req.user._id,
    });

    await newBlog.save();

    user.blogs.push(newBlog._id);
    await user.save();

    res.status(201).json({
        success: true,
        message: "Blog created successfully",
        blog: newBlog,
    });
});

const getBlogsController = catchAsyncError(async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const userBlogs = await Blog.find({ creator: req.user._id });

        res.status(200).json({
            success: true,
            message: "Blogs retrieved successfully",
            blogs: userBlogs,
        });
    } catch (error) {
        next(error);
    }
});

module.exports = {
    createBlogController,
    getBlogsController,
};
