import { useContext } from "react";
import cartIcon from "../../assets/cart-icon.png";
import classes from "./Header.module.css";
import { CartContext } from "../../store/CartContext.jsx";
import { ProgressContext } from "../../store/ProgressContext.jsx";

export default function Header() {
  const { cart, handleFilteredMeals } = useContext(CartContext);
  const { openCart } = useContext(ProgressContext);

  let cartCount = 0;
  cart.forEach((item) => {
    cartCount += item.quantity;
  });

  function handleChange(event) {
    const searchTerm = event.target.value;
    handleFilteredMeals(searchTerm);
  }

  return (
    <header className={classes.header}>
      <h1>Voda Food</h1>
      <div className={classes.headerActions}>
        <div className={classes.searchBar}>
          <input type="text" placeholder="Search..." onChange={handleChange} />
        </div>
        <div className={classes.cartIcon} onClick={openCart}>
          <img src={cartIcon} alt="Cart" />
          <span className="cart-count">{cartCount}</span>
        </div>
      </div>
    </header>
  );
}
