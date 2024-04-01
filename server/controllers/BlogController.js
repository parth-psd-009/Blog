const express = require("express");

const { catchAsyncError } = require("../middlewares/CatchAsyncError"); //To add this later
const Blog = require("../models/Blog");

const createBlogController = catchAsyncError(async (req, res, next) => {
    const blogData = req.body;

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
        creator: req.user._id,
    });

    await newBlog.save();

    res.status(201).json({
        success: true,
        message: "Blog created successfully",
        blog: newBlog,
    });
});

module.exports = {
    createBlogController,
};
