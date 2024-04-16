import React from "react";
import "./BlogDisplay.styles.css";

const BlogDisplay = ({ blog }) => {
    return (
        <div className="blog-card my-4">
            <img
                className="blog-thumbnail"
                src={blog.thumbnail}
                alt="Thumbnail"
            />
            <div className="blog-details">
                <h2 className="blog-title">{blog.title}</h2>
                <p className="blog-description">{blog.description}</p>
                <div className="blog-tags">
                    {blog.topics &&
                        blog.topics.map((topic, index) => (
                            <span key={index} className="tag">
                                {topic}
                            </span>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default BlogDisplay;
