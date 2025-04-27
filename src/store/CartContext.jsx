import { createContext, useReducer, useState } from "react";
import availableMeals from "../available-meals.json";

const CartContext = createContext({
  availableMeals,
  filteredMeals: [],
  handleFilteredMeals: () => {},
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
  removeOneItem: () => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD") {
    let updatedState = [...state];
    // Check if the item is already in the cart
    const itemExists = state.find((cartItem) => cartItem.id === action.id);
    // If the item is already in the cart, update its quantity
    if (itemExists) {
      updatedState = updatedState.map((cartItem) =>
        cartItem.id === action.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      // If the item is not in the cart, add it to the cart
      updatedState = [...updatedState, { id: action.id, quantity: 1 }];
    }

    // update the local storage with the new cart state
    localStorage.setItem("cart", JSON.stringify(updatedState));
    // return the updated state
    return updatedState;
  }

  if (action.type === "REMOVE") {
    let updatedState = [...state];
    updatedState = updatedState.filter((item) => item.id !== action.id);
    // update the local storage with the new cart state
    localStorage.setItem("cart", JSON.stringify(updatedState));
    return updatedState;
  }

  if (action.type === "REMOVE_ONE") {
    let updatedState = [...state];
    // Check if the item is already in the cart
    const itemExists = updatedState.find(
      (cartItem) => cartItem.id === action.id
    );
    // If the item is already in the cart and more than 1, update its quantity
    if (itemExists.quantity > 1) {
      updatedState = updatedState.map((cartItem) =>
        cartItem.id === action.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
    } else {
      // If the item is not in the cart, add it to the cart
      updatedState = updatedState.filter((item) => item.id !== action.id);
    }
    // update the local storage with the new cart state
    localStorage.setItem("cart", JSON.stringify(updatedState));
    // If the item quantity in the cart is only one, remove it to the cart
    return updatedState;
  }

  if (action.type === "CLEAR") {
    // Clear the cart and remove it from local storage
    localStorage.removeItem("cart");
    return [];
  }

  return state;
}

export default function CartProvider({ children }) {
  // Initialize the cart state from local storage or set it to an empty array
  const storedCart = localStorage.getItem("cart");
  const initialCart = storedCart ? JSON.parse(storedCart) : [];
  // Initialize the cart state using useReducer
  const [cart, dispatch] = useReducer(cartReducer, initialCart);
  const [filteredMeals, setFilteredMeals] = useState(availableMeals);

  function addToCart(id) {
    dispatch({ type: "ADD", id });
  }

  function removeFromCart(id) {
    dispatch({ type: "REMOVE", id });
  }
  function removeOneItem(id) {
    dispatch({ type: "REMOVE_ONE", id });
  }

  function clearCart() {
    dispatch({ type: "CLEAR" });
  }

  function handleFilteredMeals(text) {
    if (text === "") {
      setFilteredMeals(availableMeals);
    }
    const filtered = availableMeals.filter((meal) =>
      meal.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredMeals(filtered);
  }

  return (
    <CartContext.Provider
      value={{
        availableMeals,
        filteredMeals,
        cart,
        addToCart,
        removeFromCart,
        removeOneItem,
        clearCart,
        handleFilteredMeals,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartContext };
