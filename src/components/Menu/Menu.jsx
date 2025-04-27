import classes from "./Menu.module.css";
import { useContext } from "react";
import { CartContext } from "../../store/CartContext.jsx";

export default function Menu() {
  const { addToCart, filteredMeals } = useContext(CartContext);

  function addToCartHandler(meal) {
    // Add the meal to the cart
    addToCart(meal);
  }

  return (
    <div className={classes.menu}>
      {filteredMeals.length > 0 ? (
        filteredMeals.map((meal) => {
          return (
            <div key={meal.id} className={classes.menuItem}>
              <img
                src={meal.image}
                alt={meal.name}
                className={classes.menuImage}
              />
              <div className={classes.menuDetails}>
                <h3>{meal.name}</h3>
                <span className={classes.menuPrice}>${meal.price}</span>
                <p className={classes.menuDescription}>{meal.description}</p>
                <button
                  className={classes.addToCartButton}
                  onClick={() => addToCartHandler(meal.id)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <div className={classes.noMeals}>
          <h2>No Meals Available</h2>
        </div>
      )}
    </div>
  );
}
