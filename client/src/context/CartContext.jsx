import { useEffect } from "react";
import { createContext, useState } from "react";

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItem")) || []
  );

  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItems));
  }, [cartItems]);

  const addCartItem = (item) => {
    const isItemExist = cartItems.find((cartItem) => item._id === cartItem._id);

    if (isItemExist) {
      const newCartItems = cartItems.map((cartItem) =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCartItems(newCartItems);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeCartItem = (item) => {
    const newCartItems = cartItems?.filter(
      (cartItem) => cartItem._id !== item._id
    );
    setCartItems(newCartItems);
  };

  const decrementCartItem = (item) => {
    const newCartItems = cartItems?.map((cartItem) =>
      cartItem._id === item._id
        ? { ...cartItem, quantity: Math.max(cartItem.quantity - 1, 1) } : cartItem
    );
    setCartItems(newCartItems);
  };



  const incrementCartItem = (item) => {
    const newCartItems = cartItems?.map((cartItem) =>
      cartItem._id === item._id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
    setCartItems(newCartItems);
  };


  const getCartItemsNumber = () => {
    const numberOfItems = cartItems?.reduce(
      (toatl, item) => toatl + item.quantity,
      0
    );
    return numberOfItems;
  };
  const getTotalPrice = () => {
    const totalPrice = cartItems?.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    return totalPrice;
  };

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem("cartItem")
  }
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addCartItem,
        removeCartItem,
        getCartItemsNumber,
        decrementCartItem,
        incrementCartItem,
        getTotalPrice,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
