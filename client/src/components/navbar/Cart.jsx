import React, { useContext, useState } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { CartContext } from "../../context/CartContext";

const Cart = () => {
  const { cartItems, getCartItemsNumber } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        type="button"
        className="  rounded-full hover:bg-amber-300  p-3 transition-all duration-300 flex items-center relative"
      >
        <HiOutlineShoppingBag />
        <span className="absolute top-[-6px] right-0 text-red-500  ">
          {getCartItemsNumber()}
        </span>
      </button>
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed top-0 right-0 h-full w-full bg-gray-800  opacity-40 z-20"
        ></div>
      )}

      <div
        className={`fixed bg-white  top-0 right-0 h-full w-3/5 z-50 transform ${
          open ? "translate-x-0" : "translate-x-full"
        } transition-all transform  duration-300  p-4  `}
      >
        {cartItems?.map((item) => (
          <div>{item.name}</div>
        ))}
      </div>
    </>
  );
};

export default Cart;
