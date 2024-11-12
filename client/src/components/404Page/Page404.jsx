import React from "react";
import { useNavigate } from "react-router-dom";

const Page404 = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-amber-50 text-2xl font-bold text-gray-600 flex flex-col items-center justify-center ">
      <h className="text-2xl font-bold text-gra-600 letter flex flex-col gap-5 items-center">
        <span className="tracking-[1rem] text-[70px] ">404</span>
        <span>Oops,You are lost.!!</span>
      </h>
      <button
        className="bg-amber-500 px-10 p-1 rounded-lg mt-5 hover:bg-amber-300  hover:-translate-y-1 hover:scale-105 transition-all duration-300 "
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  );
};

export default Page404;
