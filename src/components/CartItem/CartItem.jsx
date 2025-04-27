import classes from "./CartItem.module.css";
import { useContext } from "react";
import { CartContext } from "../../store/CartContext.jsx";
import trashIcon from "../../assets/trash-bin.png";

export default function CartItem({ item, meal }) {
  const { addToCart, removeFromCart, removeOneItem } = useContext(CartContext);
  return (
    <div key={item.id} className={classes.cartItem}>
      <div className={classes.itemDescription}>
        <img src={meal.image} alt={meal.name} />
        <div className={classes.itemDetails}>
          <h3>{meal.name}</h3>
          <span>${meal.price}</span>
        </div>
      </div>
      <div className={classes.cartItemActions}>
        <button
          className={classes.button}
          onClick={() => removeOneItem(item.id)}
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button className={classes.button} onClick={() => addToCart(item.id)}>
          +
        </button>
        <button
          className={classes.trachIcon}
          onClick={() => removeFromCart(item.id)}
        >
          <img src={trashIcon} alt="Remove" />
        </button>
      </div>
    </div>
  );
}
