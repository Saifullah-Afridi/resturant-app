import React from "react";
import Container from "../navbar/container/Container";

const MenuSkeleton = ({ count }) => {
  return (
    <Container>
      <div className="flex gap-4 mt-6">
        {Array(count)
          .fill(5)
          .map((_, index) => (
            <div key={index} className="flex flex-col gap-2 ">
              <div className="h-28 w-28 bg-gray-300 animate-pulse    rounded-full"></div>
              <div className="h-6 bg-gray-300 w-28  animate-pulse"></div>
            </div>
          ))}
      </div>
    </Container>
  );
};

export default MenuSkeleton;
