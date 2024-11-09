import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Rating = ({ rating, setRating }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((value, index) => (
        <div
          key={index}
          onClick={() => setRating(index + 1)}
          className="cursor-pointer text-yellow-400"
        >
          {index < rating ? (
            <AiFillStar size={18} />
          ) : (
            <AiOutlineStar size={18} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Rating;
