import React, { useContext, useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { CartContext } from "../../context/CartContext";

const Cart = () => {
const { cartItems, getCartItemsNumber } = useContext(CartContext);
  return (
    <button
      type="button"
      className="  rounded-full hover:bg-amber-300  p-3 transition-all duration-300 flex items-center relative"
    >
      <HiOutlineShoppingBag />
      <span className="absolute top-[-6px] right-0 text-red-500  ">{getCartItemsNumber()}</span>
    </button>
  );
};

export default Cart;
