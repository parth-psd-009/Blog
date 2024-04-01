const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    commenterName: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Comment", commentSchema);
