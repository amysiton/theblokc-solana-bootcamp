import React from "react";

export const PostProvider = ({children}) => {
 return (
    <div className="post-container">
        {children}
    </div>
 )
}