'use client'

import React from "react";

const PlusIcon: React.FC<React.HTMLAttributes<SVGElement>> = ({
    className,
    onClick
}) => {
    return (
        <svg
            className={className}
            onClick={onClick}
            fill="none"
            stroke="black"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M18 12h-6m0 0H6m6 0V6m0 6v6" />
        </svg>
    );
};

export default PlusIcon;
