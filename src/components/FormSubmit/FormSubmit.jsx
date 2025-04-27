import { useContext } from "react";
import { CartContext } from "../../store/CartContext.jsx";
import { ProgressContext } from "../../store/ProgressContext.jsx";
import availableMeals from "../../available-meals.json";
import Modal from "../Modal/Modal.jsx";
import Input from "../Input/Input.jsx";
import useInput from "../../hooks/useInput.js";
import {
  isEmail,
  isPhoneNumber,
  calculateTotal,
} from "../../util/helperFunc.js";
import classes from "./FormSubmit.module.css";

export default function FormSubmit() {
  const nameInput = useInput("");
  const emailInput = useInput("", isEmail);
  const phoneInput = useInput("", isPhoneNumber);
  const streetInput = useInput("");
  const cityInput = useInput("");

  function clearForm() {
    nameInput.reset();
    emailInput.reset();
    phoneInput.reset();
    streetInput.reset();
    cityInput.reset();
  }

  const { cart, clearCart } = useContext(CartContext);
  const { formDiaolg, closeForm, openSuccess } = useContext(ProgressContext);

  function handleOnSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    clearForm();
    clearCart();
    openSuccess();
  }

  return (
    <Modal ref={formDiaolg} onClose={closeForm}>
      <form className={classes.form} onSubmit={handleOnSubmit}>
        <h2>Checkout</h2>
        <p>
          Total Price: <span>${calculateTotal(cart, availableMeals)}</span>
        </p>
        <Input
          inputHook={nameInput}
          label="Name"
          type="text"
          id="name"
          error="Please enter a valid name"
        />
        <Input
          inputHook={emailInput}
          label="Email"
          type="email"
          id="email"
          error="Please enter a valid email"
        />
        <Input
          inputHook={phoneInput}
          label="Phone"
          type="tel"
          id="phone"
          error="Please enter a valid phone number"
        />
        <Input
          inputHook={streetInput}
          label="Street"
          type="text"
          id="street"
          error="Please enter a valid street address"
        />
        <Input
          inputHook={cityInput}
          label="City"
          type="text"
          id="city"
          error="Please enter a valid city"
        />
        <div className={classes.formActions}>
          <button
            className={classes.cancelButton}
            type="button"
            onClick={closeForm}
          >
            Close
          </button>
          <button className={classes.submitButton} type="submit">
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
}
