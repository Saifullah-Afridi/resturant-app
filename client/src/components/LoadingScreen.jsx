import React from "react";

const LoadingScreen = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-1 z-[999999]">
            <div className="flex flex-col items-center">
                <div className="animate-spin rounded-full border-t-4 border-blue-500 h-16 w-16 mb-4"></div>
                <span className="text-lg font-semibold text-gray-700">Loading...</span>
            </div>
        </div>
    );
};

export default LoadingScreen;
