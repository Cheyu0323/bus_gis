'use client'

import React from "react";

const MapIcon: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className,
}) => {
    return (
        <svg
            className={className}
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M1.875 3.75L5.625 1.875L9.375 3.75L13.125 1.875V11.25L9.375 13.125L5.625 11.25L1.875 13.125V3.75Z"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5.625 1.875V11.25"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M9.375 3.75V13.125"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default MapIcon;
