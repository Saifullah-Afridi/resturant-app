import React, { useContext, useState } from "react";
import {
  HiArrowLeft,
  HiOutlineShoppingBag,
  HiOutlineTrash,
} from "react-icons/hi2";
import { CartContext } from "../../context/CartContext";
import { AiOutlineBackward } from "react-icons/ai";

const Cart = () => {
  const {
    cartItems,
    getCartItemsNumber,
    removeCartItem,
    decrementCartItem,
    incrementCartItem,
    getTotalPrice,
  } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const [currentstate, setCurrentState] = useState("cart");

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
        className={`fixed  top-0 right-0 h-full w-[700px] z-50 transform ${
          open ? "translate-x-0" : "translate-x-full"
        } transition-all transform  duration-300  p-4 overflow-auto  px-5 bg-gray-200`}
      >
        {currentstate === "cart" && (
          <div>
            <div className="flex flex-col  items-center border-b-2 pb-3 mb-4 ">
              <h3 className="font-semibold text-2xl">Your Cart</h3>
              <div className=" my-2 font-semibold bg-red-600 h-1 w-28"></div>
            </div>
            {cartItems.length > 0 ? (
              <div>
                {cartItems?.map((item) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center my-2 border-2 shadow-xs p-2 bg-white "
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
                    <div className="flex flex-col items-center ">
                      <span className="text-lg ">{item.name}</span>
                      <span className="text-gray-600">
                        Price: {item.price}$
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        className="bg-amber-400 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-amber-500"
                        onClick={() => decrementCartItem(item)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="bg-amber-400 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-amber-500"
                        onClick={() => incrementCartItem(item)}
                      >
                        +
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={() => removeCartItem(item)}
                        className="p-2 rounded-full border border-amber-600 hover:bg-amber-500 transition-all duration-200 flex items-center justify-center"
                      >
                        <HiOutlineTrash size="22" />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between items-center my-5 border p-3 border-amber-600 rounded-lg">
                  <div className="flex flex-col gap-1">
                    <h4 className="  text-amber-600 font-medium  ">
                      {" "}
                      Dishes Price: {getTotalPrice()}$
                    </h4>
                    <h4 className=" text-amber-600 font-medium ">
                      Delevery Price: 2$
                    </h4>
                    <h4 className=" text-lg text-amber-600 font-medium border-b border-gra">
                      {" "}
                      Totel Price: {getTotalPrice() + 2}$
                    </h4>
                  </div>
                  <button
                    className="bg-amber-500 px-4 py-2 rounded-lg hover:-translate-y-[1px] transition-all duration-75 self-end"
                    onClick={() => setCurrentState("placeOrder")}
                  >
                    Order Now
                  </button>
                </div>
              </div>
            ) : (
              <div className=" flex justify-center text-xl font-semibold text-amber-600 mt-10">
                You have no item in cart
              </div>
            )}
          </div>
        )}
        {currentstate === "placeOrder" && (
          <div className="bg-gray-200 h-full ">
            <HiArrowLeft
              className="mb-3 text-red-500 font-bold cursor-pointer "
              size="22"
              onClick={() => setCurrentState("cart")}
            />

            <div className="flex justify-center   items-center ">
              <div className="self-start "></div>
              <div className="flex flex-col  justify-start items-center border-b-2 pb-2 mb-4 self-center  ">
                <h3 className="font-semibold text-2xl">Check Out</h3>
                <div className=" my-1 font-semibold bg-red-600 h-1 w-28"></div>
              </div>
            </div>

            <div className="flex flex-col gap-3 border-2">
              <div>
                <h3 className="text-xl text-center mb-4 ">Delivery Detail</h3>
                <form className="flex flex-col gap-5  bg-amber-50  p-3">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Your name"
                    className="h-8 p-2 bg-transparent  border-2 border-amber-900 "
                  />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Your email"
                    className="h-8 p-2 bg-transparent  border-2 border-amber-900 "
                  />
                  <input
                    type="text"
                    name="address"
                    id="address"
                    placeholder="Enter Your address"
                    className="h-8 p-2 bg-transparent  border-2 border-amber-900 "
                  />
                  <input
                    type="phone"
                    name="phone"
                    id="phone"
                    placeholder="enter your phone number"
                    className="h-8 p-2 bg-transparent  border-2 border-amber-900 "
                  />
                </form>
              </div>
              <div className="bg-red-600 h-2 w-full my-1"></div>
              <div>
                <h3 className="text-xl text-center  border-b border-b-amber-500">
                  Price Detail
                </h3>
                <div className="flex justify-between items-center border-gray-400 border-b-2 pb-2 ">
                  <span>Dishes Price:</span>
                  <span>{getTotalPrice()}$</span>
                </div>
                <div className="flex justify-between items-center border-gray-400 border-b-2 pb-2 ">
                  <span>Delevery Fee:</span>
                  <span>2$</span>
                </div>
                <div className="flex justify-between items-center border-gray-400 border-b-2 pb-2 ">
                  <span>Total Price:</span>
                  <span>{getTotalPrice() + 2}$</span>
                </div>
              </div>
              <button className="bg-amber-500 p-2 rounded-lg mb-2 hover:bg-amber-600">
                Check Out
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
