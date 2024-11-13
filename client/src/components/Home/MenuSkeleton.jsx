import React from "react";

const MenuSkeleton = ({ count }) => {
  return (
    <div>
      <div className="flex flex-wrap  gap-4 mt-6 mx-4">
        {Array(count)
          .fill(5)
          .map((_, index) => (
            <div key={index} className="flex flex-col gap-3 ">
              <div className="h-36 w-36 bg-gray-300 animate-pulse    rounded-full"></div>
              <div className="h-6 bg-gray-300 w-36  animate-pulse  "></div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MenuSkeleton;
