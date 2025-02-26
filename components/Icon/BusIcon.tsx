'use client'

import React from "react";

const BusIcon: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
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
                d="M11.875 10.625H13.125L13.525 9.0375C13.675 8.43813 13.675 7.81125 13.525 7.2125L12.8562 4.54375C12.7546 4.1384 12.5204 3.77865 12.1909 3.52161C11.8613 3.26457 11.4554 3.12498 11.0375 3.125H2.5C2.16848 3.125 1.85054 3.2567 1.61612 3.49112C1.3817 3.72554 1.25 4.04348 1.25 4.375V10.625H2.5"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.75 10.625H5.625"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M4.0625 12.5C4.92544 12.5 5.625 11.8004 5.625 10.9375C5.625 10.0746 4.92544 9.375 4.0625 9.375C3.19956 9.375 2.5 10.0746 2.5 10.9375C2.5 11.8004 3.19956 12.5 4.0625 12.5Z"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M10.3125 12.5C11.1754 12.5 11.875 11.8004 11.875 10.9375C11.875 10.0746 11.1754 9.375 10.3125 9.375C9.44956 9.375 8.75 10.0746 8.75 10.9375C8.75 11.8004 9.44956 12.5 10.3125 12.5Z"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default BusIcon;
