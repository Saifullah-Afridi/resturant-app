import React, { useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";

const Cart = () => {
  const [items, setItems] = useState(1);
  return (
    <button
      type="button"
      className="  rounded-full hover:bg-amber-300  p-3 transition-all duration-300 flex items-center relative"
    >
      <HiOutlineShoppingBag />
      <span className="absolute top-0 right-0 text-amber-900  ">{items}</span>
    </button>
  );
};

export default Cart;
