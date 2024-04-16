import React from "react";

const BlogComponent = ({ blog }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row md:space-x-6 my-4">
            <img
                className="w-full md:w-48 h-48 object-cover mb-4 md:mb-0 rounded-xl"
                src={blog.thumbnail}
                alt="Thumbnail"
            />
            <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-700 mb-4 w-90 text-left">
                    {blog.description}
                </p>
                <div className="flex flex-wrap">
                    <p>Tags</p>
                    {blog.topics &&
                        blog.topics.map((topic, index) => (
                            <span
                                key={index}
                                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm mr-2 mb-2"
                            >
                                <span className="text-gray-500 mr-1">
                                    &#8226;
                                </span>
                                {topic}
                            </span>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default BlogComponent;
