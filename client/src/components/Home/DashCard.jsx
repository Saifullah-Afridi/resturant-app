import React, { useContext, useState } from "react";
import Rating from "./Rating";
import { CartContext } from "../../context/CartContext";

const DashCard = ({ name, image, price, description }) => {
  const [rating, setRating] = useState();
  const [quantity, setQuantity] = useState(0);
  const { addCartItem } = useContext(CartContext);
  return (
    <div className=" mb-12 group cursor-pointer shadow-lg">
      <div className="relative">
        <img
          src={image}
          alt="food image"
          width="100%"
          className="overflow-hidden group-hover:scale-105 transition-all rounded-t-lg rounded-r-lg    duration-300  "
        />
        <div className="flex gap-[6px] items-center absolute bottom-1 bg-white rounded-full   right-2">
          <button
            className="w-9 border-2 p-1 transition-all duration-200 border-amber-600 bg-red-100 hover:bg-amber-300 rounded-full"
            onClick={() => {
              if (quantity <= 0) {
                return;
              }
              setQuantity((prev) => prev - 1);
            }}
          >
            -
          </button>
          <span>{`${quantity === 0 ? "" : quantity}`}</span>
          <button
            className="w-9 border-2 p-1 border-amber-600 bg-green-100 hover:bg-amber-300 rounded-full duration-200 "
            onClick={() => {
              setQuantity(quantity + 1);
            }}
          >
            +
          </button>
        </div>
      </div>
      <div className="p-2">
        <div className="flex justify-between items-center my-3  ">
          <h3 className="font-medium">{name}</h3>
          <Rating rating={rating} setRating={setRating} />
        </div>
        <p className="text-gray-900">{description}</p>
        <h4 className="text-amber-600 mt-2 text-lg font-semibold px-1 ">
          ${price}
        </h4>
      </div>
    </div>
  );
};

export default DashCard;
