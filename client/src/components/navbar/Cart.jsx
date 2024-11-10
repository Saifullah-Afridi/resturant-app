import React, { useContext, useState } from "react";
import { HiOutlineShoppingBag, HiOutlineTrash, HiTrash } from "react-icons/hi2";
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
        className={`fixed bg-white  top-0 right-0 h-full w-[700px] z-50 transform ${
          open ? "translate-x-0" : "translate-x-full"
        } transition-all transform  duration-300  p-4 overflow-auto  px-5 `}
      >
        <div className="flex flex-col  items-center border-b-2 pb-3 mb-4 ">
          <h3 className="font-semibold text-2xl">Your Cart</h3>
          <div className=" my-2 font-semibold bg-red-600 h-1 w-28"></div>
        </div>
        <div>
          {cartItems?.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center my-2 border-2 shadow-xs    p-2 "
            >
              <div>
                <img
                  src={item.image}
                  width="100px"
                  height="10  0px"
                  className=" p-1 rounded-xl 
                object-cover
                "
                  circle
                  alt=""
                />
              </div>
              <div className="flex">
                <span className="text-lg ">{item.name}</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="bg-amber-400 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-amber-500">
                  -
                </button>
                <span>{item.quantity}</span>
                <button className="bg-amber-400 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-amber-500">
                  +
                </button>
              </div>
              <div>
                <button className="p-2 rounded-full border border-amber-600 hover:bg-amber-500 transition-all duration-200 flex items-center justify-center">
                  <HiOutlineTrash size="22" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cart;
