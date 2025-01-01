'use client'

import React from "react";

const MinusIcon: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className,
}) => {
    return (
        <svg
            className={className}
            fill="none"
            stroke="black"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M6 12h12" />
        </svg>
    );
};

export default MinusIcon;
