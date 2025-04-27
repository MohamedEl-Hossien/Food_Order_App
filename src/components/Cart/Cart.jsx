import { useContext } from "react";
import { CartContext } from "../../store/CartContext.jsx";
import { ProgressContext } from "../../store/ProgressContext.jsx";
import classes from "./Cart.module.css";
import availableMeals from "../../available-meals.json";
import CartItem from "../CartItem/CartItem.jsx";
import Modal from "../Modal/Modal.jsx";
import { calculateTotal } from "../../util/helperFunc.js";

export default function Cart() {
  const { cart } = useContext(CartContext);
  const { cartDiaolg, closeCart, openForm } = useContext(ProgressContext);

  function handleCheckout() {
    closeCart();
    openForm();
  }

  return (
    <Modal ref={cartDiaolg} onClose={closeCart}>
      <div className={classes.cart}>
        <div className={classes.cartHeader}>
          <h2>Your Cart</h2>
          <button
            className={classes.closeButton}
            onClick={() => cartDiaolg.current.close()}
          >
            X
          </button>
        </div>
        {cart.length > 0 ? (
          cart.map((item) => {
            const meal = availableMeals.find((meal) => meal.id === item.id);
            return <CartItem key={item.id} item={item} meal={meal} />;
          })
        ) : (
          <p className={classes.emptyCart}>Your cart is empty.</p>
        )}
        {cart.length > 0 && (
          <div className={classes.cartFooter}>
            <div className={classes.totalPrice}>
              <span>Total Price: </span>
              <span>${calculateTotal(cart, availableMeals).toFixed(2)}</span>
            </div>
            <button className={classes.checkoutButton} onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
}
