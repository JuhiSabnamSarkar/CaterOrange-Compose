import React, { createContext, useContext, useReducer } from 'react';

// Define initial state
const initialState = {
  cartItems: [],
};

// Create context
const CartContext = createContext();

// Define reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
      };
    // Add more cases for other actions like removing from cart, updating quantity, etc.
    default:
      return state;
  }
};

// Create provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Define actions
  const addToCart = (item) => {
    dispatch({ type: 'ADD_TO_CART', payload: item });
  };

  // Add more action functions here

  return (
    <CartContext.Provider value={{ cart: state.cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to consume the context
export const useCart = () => useContext(CartContext);
