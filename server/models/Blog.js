const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            trim: true,
        },
        topics: [
            {
                type: String,
            },
        ],
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        content: [
            {
                type: {
                    type: String,
                    enum: ["text", "image"],
                    required: true,
                },
                value: {
                    type: String,
                    required: true,
                },
                index: {
                    type: Number,
                    default: 0,
                    autoIncrement: true,
                    required: true,
                },
            },
        ],
        viewCount: {
            type: Number,
            default: 0,
        },
        upvotes: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
            },
        ],
        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    {
        timestamps: true, // Optionally include timestamps
        // Set the default value of upvotes to an empty array
        // upvotes: { type: Array, default: [] },
        // comments: { type: Array, default: [] },
    }
);

blogSchema.pre("save", function (next) {
    if (!this.creator) {
        this.creator = req.user._id;
    }
    const content = this.content;
    content.forEach((item, index) => {
        if (!item.index) {
            item.index = index + 1; // Start indexing from 1
        }
    });

    next();
});

blogSchema.path("upvotes").default([]);
blogSchema.path("comments").default([]);

module.exports = mongoose.model("Blog", blogSchema);
