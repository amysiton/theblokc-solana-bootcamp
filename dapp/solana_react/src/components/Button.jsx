import React from "react";

export const Button = ({ 
    children,
    loading = false,
    className = "",
    disabled,
    icon,
    isInput,
    ...props
}) => {
    return (
        <button 
            disabled={disabled}            
            className={`px-4 py-2 font-semibold text-sm bg-cyan-500 text-white rounded-full shadow-sm hover:bg-cyan-600 active:bg-cyan-700 focus:outline-none focus:ring focus:ring-cyan-300
                ${className} 
                ${disabled ? "disabled:bg-cyan-800 opacity-60" : ""}
            `}
            {...props}
        >
            {children}
        </button>
    )
}