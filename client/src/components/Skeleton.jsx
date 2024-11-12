import React from "react";

const Skeleton = ({ count }) => {
  return (
    <>
      {Array(count)
        .fill(3)
        .map((_, index) => (
          <div className="mt-1">
            <div>
              <div className=" animate-pulse h-[200px] bg-gray-300"></div>
              <div className="mt-4 flex flex-col gap-4  ">
                <div className="h-[30px] bg-gray-300 animate-pulse  rounded-lg">
                  {" "}
                </div>
                <div className="h-[30px] bg-gray-300 animate-pulse  rounded-lg">
                  {" "}
                </div>
                <div className="h-[30px] bg-gray-300 animate-pulse  rounded-lg">
                  {" "}
                </div>
                <div className="h-[30px] bg-gray-300 animate-pulse  rounded-lg">
                  {" "}
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default Skeleton;
