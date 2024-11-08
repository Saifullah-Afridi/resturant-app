import React, { useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Rating = ({ rating, setRating }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((value, index) => (
        <div
          key={index}
          onClick={() => setRating(index + 1)}
          className="cursor-pointer text-yellow-400"
        >
          {index < rating ? (
            <AiFillStar size={20} />
          ) : (
            <AiOutlineStar size={20} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Rating;
