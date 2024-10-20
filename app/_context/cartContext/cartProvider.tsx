"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { CartItem, cartReducer, CartState } from "./cartReducer";

const CartContext = createContext<
  | {
      cart: CartState;
      addToCart: (item: CartItem) => void;
      removeFromCart: (id: number) => void;
      updateQuantity: (id: number, quantity: number) => void;
      clearCart: () => void;
    }
  | undefined
>(undefined);

function CartProvider({ children }: { children: ReactNode }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  useEffect(function () {
    const storedCart = localStorage.getItem("cart");

    if (storedCart) {
      const parsedCart: CartState = JSON.parse(storedCart);
      dispatch({ type: "INITIALIZE_CART", payload: parsedCart });
    }
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  function addToCart(item: CartItem) {
    dispatch({ type: "ADD_TO_CART", payload: item });
  }

  function removeFromCart(id: number) {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });

    const updatedCart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  }

  function updateQuantity(id: number, quantity: number) {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  }

  function clearCart() {
    dispatch({ type: "CLEAR_CART" });
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export { CartProvider, useCart };
