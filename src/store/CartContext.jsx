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
    // Check if the item is already in the cart
    const itemExists = state.find((cartItem) => cartItem.id === action.id);
    // If the item is already in the cart, update its quantity
    if (itemExists) {
      return state.map((cartItem) =>
        cartItem.id === action.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    }
    // If the item is not in the cart, add it to the cart
    return [...state, { id: action.id, quantity: 1 }];
  }

  if (action.type === "REMOVE") {
    return [...state.filter((item) => item.id !== action.id)];
  }

  if (action.type === "REMOVE_ONE") {
    // Check if the item is already in the cart
    const itemExists = state.find((cartItem) => cartItem.id === action.id);
    // If the item is already in the cart and more than 1, update its quantity
    if (itemExists.quantity > 1) {
      return state.map((cartItem) =>
        cartItem.id === action.id
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      );
    }
    // If the item quantity in the cart is only one, remove it to the cart
    return [...state.filter((item) => item.id !== action.id)];
  }

  if (action.type === "CLEAR") {
    return [];
  }

  return state;
}

export default function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);
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
