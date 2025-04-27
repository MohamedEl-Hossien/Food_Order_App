export function isEmail(value) {
  return value.includes("@");
}

export function isPhoneNumber(value) {
  return value.length === 11 && !isNaN(value);
}

export function calculateTotal(cart, availableMeals) {
  return cart.reduce((total, item) => {
    const meal = availableMeals.find((meal) => meal.id === item.id);
    return total + meal.price * item.quantity;
  }, 0);
}
