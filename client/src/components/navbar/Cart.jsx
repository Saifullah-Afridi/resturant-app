import React, { useContext, useEffect, useState } from "react";
import {
  HiArrowLeft,
  HiOutlineShoppingBag,
  HiOutlineTrash,
} from "react-icons/hi2";
import { CartContext } from "../../context/CartContext";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    getCartItemsNumber,
    removeCartItem,
    decrementCartItem,
    incrementCartItem,
    getTotalPrice,
    clearCart
  } = useContext(CartContext);
  const [open, setOpen] = useState(false);
  const [currentstate, setCurrentState] = useState("cart");
  const [pendingOrder, setPendingOrder] = useState(false)
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: "",
    phone: "",
    address: "",
  })
  const [priceDetail, setPriceDetail] = useState({
    dishesPrice: JSON.parse(localStorage.getItem("dishesPrice")) || 0,
    deliveryPrice: JSON.parse(localStorage.getItem("deliveryPrice")) || 0,
    totalPrice: JSON.parse(localStorage.getItem("totalPrice")) || 0,
  })
  const [orderStatus, setOrderStatus] = useState(JSON.parse(localStorage.getItem("orderStatus")) || null)
  const [placeOrder, setPlaceOrder] = useState(JSON.parse(localStorage.getItem('placeOrder') || false))



  const handleInput = (e) => {
    setDeliveryDetails({
      ...deliveryDetails, [e.target.name]: e.target.value
    })
  }

  const handleSumbit = async () => {
    if (pendingOrder) {
      alert("You already have a pending order. Complete it before placing a new one.");
      return;
    }
    const dishes = cartItems
    try {
      const res = await axios.post("http://localhost:3000/api/v1/orders", { deliveryDetails, dishes }, {
        withCredentials: true
      })
      const orderId = res.data.newOrder._id
      const responseOrderDetail = await axios.get(`http://localhost:3000/api/v1/orders/${orderId}`, {
        withCredentials: true
      })
      localStorage.setItem("orderStatus", JSON.stringify(responseOrderDetail.data.order.status))
      setOrderStatus(responseOrderDetail.data.order.status)
      localStorage.setItem("dishesPrice", JSON.stringify(responseOrderDetail.data.order.dishesPrice))

      localStorage.setItem("deliveryPrice", JSON.stringify(
        responseOrderDetail.data.order.deliveryPrice
      ))
      localStorage.setItem("totalPrice", JSON.stringify(responseOrderDetail.data.order.totalPrice))
      localStorage
      setPriceDetail({
        dishesPrice: responseOrderDetail.data.order.dishesPrice,
        deliveryPrice: responseOrderDetail.data.order.deliveryPrice,
        totalPrice: responseOrderDetail.data.order.totalPrice
      })
      clearCart();
      setDeliveryDetails({
        name: "",
        address: "",
        phone: "",
      })
      localStorage.setItem('placeOrder', "true");
      setPlaceOrder(true)
      setCurrentState("cart")
      console.log(res);
    } catch (error) {
      console.log(error);
    }

  }

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v1/orders/order-by-me", {
        withCredentials: true
      })
      const myOrders = res.data.myOrders
      const pendingOrderStatus = myOrders.find(order => order.status === "pending")
      if (pendingOrderStatus) {
        setPendingOrder(true)
      }
      console.log(res);

    } catch (error) {
      console.log(error);

    }
  }
  const navigate = useNavigate()


  useEffect(() => {
    if (placeOrder) {
      fetchOrders();
    }
  }, [placeOrder]);



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
          className="fixed top-0 right-0 h-full w-full bg-gray-800  bg-opacity-60"
        ></div>
      )}

      <div
        className={`fixed  top-0 right-0 h-full w-[700px]  transform ${open ? "translate-x-0" : "translate-x-full"
          } transition-all transform  duration-300  p-4 overflow-auto  px-5 bg-gray-200 `}
      >
        {currentstate === "trackOrder" && (
          <div className="flex flex-col items-center justify-center h-full p-5 bg-gray-200">
            <h3 className="font-semibold text-2xl text-amber-600">Track Your Order</h3>

            <div className="mt-5 w-full bg-white p-4 rounded-lg shadow-lg">
              <h4 className="text-lg font-semibold text-gray-600">Order Status</h4>
              <p className="mt-2 text-xl font-bold text-green-500">{orderStatus}</p>
              <p className="mt-2 text-gray-700">Your order is on its way to the kitchen.</p>
            </div>


            {/* Action Buttons */}
            <div className="mt-6 flex gap-4">
              <button
                className="bg-amber-500 px-6 py-2 rounded-lg hover:bg-amber-600 transition-all"
                onClick={() => setCurrentState("cart")}
              >
                Go to Cart
              </button>
              <button
                className="bg-gray-300 px-6 py-2 rounded-lg hover:bg-gray-400 transition-all"
                onClick={() => {
                  setOpen(false)
                  fetchOrders()

                }}
              >
                Close
              </button>
            </div>
          </div>
        )}
        {currentstate === "cart" && (
          <>
            {placeOrder && (
              <div className="flex flex-col items-center justify-center h-full p-5 bg-gray-200">
                <div className="text-center">
                  <h3 className="font-semibold text-2xl text-green-600">Order Placed!</h3>
                  <p className="text-lg mt-2 text-gray-700">
                    Your order has been placed successfully. It's currently being processed and will be delivered shortly.
                  </p>
                </div>

                {/* Order Summary */}
                <div className="mt-5 w-full bg-white p-4 rounded-lg shadow-lg">
                  <h4 className="text-lg font-semibold text-amber-600">Order Summary</h4>
                  <div className="flex justify-between items-center py-2">
                    <span>Dishes Price:</span>
                    <span>{priceDetail.dishesPrice}$</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Delivery Fee:</span>
                    <span>{priceDetail.deliveryPrice}$</span>
                  </div>
                  <div className="flex justify-between items-center py-2 font-semibold">
                    <span>Total Price:</span>
                    <span>{priceDetail.totalPrice}$</span>
                  </div>
                </div>



                {/* Action Buttons */}
                <div className="flex gap-4 mt-6">
                  <button
                    className="bg-amber-500 px-6 py-2 rounded-lg hover:bg-amber-600 transition-all"
                    onClick={() => {
                      setOpen(false)
                      navigate("/")
                    }}
                  >
                    Continue Shopping
                  </button>

                  <button
                    className="bg-blue-500 px-6 py-2 rounded-lg hover:bg-blue-600 transition-all"
                    onClick={() => setCurrentState("trackOrder")}
                  >
                    Track Order
                  </button>
                </div>
              </div>
            )}
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
                          src={item.image.url}
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
          </>
        )}
        {
          currentstate === "placeOrder" && (
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
                  <form className="flex flex-col gap-5  bg-amber-50 z-[999999999999] p-3">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter Your name"
                      className="h-8 p-2   border-2 border-amber-900 "
                      value={deliveryDetails.name}
                      onChange={handleInput}
                    />

                    <input
                      type="text"
                      name="address"
                      id="address"
                      placeholder="Enter Your address"
                      className="h-8 p-2 bg-transparent  border-2 border-amber-900 "
                      value={deliveryDetails.address}
                      onChange={handleInput}
                    />
                    <input
                      type="phone"
                      name="phone"
                      id="phone"
                      placeholder="enter your phone number"
                      className="h-8 p-2 bg-transparent  border-2 border-amber-900 "
                      value={deliveryDetails.phone}
                      onChange={handleInput}
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
                <button onClick={handleSumbit} className="bg-amber-500 p-2 rounded-lg mb-2 hover:bg-amber-600">
                  Check Out
                </button>
              </div>
            </div>
          )
        }
      </div >
    </>
  );
};

export default Cart;
