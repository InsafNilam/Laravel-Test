import React from "react";

export default function BatchCard({ icon, title, description }) {
    return (
        <div className="relative flex items-center p-4 bg-gray-100 rounded-md shadow-md dark:bg-slate-700">
            <span className="absolute inset-x-0 bottom-0 h-1 rounded-b-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
            <div className="flex items-center gap-x-4">
                {icon && (
                    <div className="w-12 h-12 overflow-hidden rounded-full">
                       {icon}
                    </div>
                )}
                <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {title}
                    </h3>
                    <p className="text-gray-500 dark:text-[#9CA3AF]">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
}
