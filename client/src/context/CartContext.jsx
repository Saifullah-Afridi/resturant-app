import { createContext, useState } from "react";

export const CartContext = createContext();

const [cartItems, setCartItems] = useState([]);

const addCartItem = (item) => {
  const isItemExist = cartItems?.find((cartItem) => item._id === cartItem._id);
  if (isItemExist) {
    const newCartItems = cartItems.map((cartItem) =>
      cartItem._id === item._id
        ? { ...cartItem, qunatity: item.qunatity + 1 }
        : cartItem
    );
    cartItems(newCartItems);
  } else {
    setCartItems([...cartItems, item]);
  }
};

const removeCartItem = (item) => {
  const newCartItems = cartItems?.filter(
    (cartItem) => cartItem._id !== item._id
  );
  setCartItems(newCartItems);
};

const decrementCartItem = (item) => {
  const newCartItems = cartItems.map((cartItem) =>
    cartItem._id === item._id
      ? { ...cartItem, qunatity: item.qunatity - 1 }
      : cartItem
  );
  setCartItems(newCartItems);
};

const increamentCartItem = (item) => {
  const newCartItems = cartItems.map((cartItem) =>
    cartItem._id === item._id
      ? { ...cartItem, qunatity: item.qunatity + 1 }
      : cartItem
  );
  setCartItems(newCartItems);
};

const NumberOfCartItems = () => {
  const NumberOfItems = cartItems.reduce(
    (toatl, item) => toatl + item.qunatity,
    0
  );
  return NumberOfItems;
};

export default cartProvider = ({ children }) => {
  return (
    <CartContext.Provider
      value={
        (cartItems,
        addCartItem,
        removeCartItem,
        increamentCartItem,
        decrementCartItem,
        NumberOfCartItems)
      }
    >
      {children}
    </CartContext.Provider>
  );
};
