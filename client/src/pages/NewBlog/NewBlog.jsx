import React, { useState } from "react";
import "./NewBlog.styles.css";
import { Input } from "@chakra-ui/react";
const NewBlog = () => {
    const [blogTitle, setBlogTitle] = useState("");
    return (
        <div className="newblog-container">
            <Input
                className="mt-6"
                w="50%"
                placeholder="Title..."
                // placeholderTextColor="red.500"
                _placeholder={{ color: "white", opacity: "60%" }}
                fontSize="1.5rem"
                color="white"
                variant="unstyled"
                onChange={(e) => {
                    setBlogTitle(e.target.value);
                    console.log(blogTitle);
                }}
            />
        </div>
    );
};

export default NewBlog;
