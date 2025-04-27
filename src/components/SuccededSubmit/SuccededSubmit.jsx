import Modal from "../Modal/Modal.jsx";
import classes from "./SuccededSubmit.module.css";
import { useContext } from "react";
import { ProgressContext } from "../../store/ProgressContext.jsx";

export default function SuccededSubmit() {
  const { successDiaolg, closeSuccess } = useContext(ProgressContext);

  return (
    <Modal ref={successDiaolg} onClose={closeSuccess}>
      <div className={classes.succededSubmit}>
        <h2>Order Submitted Successfully!</h2>
        <p>Thank you for your order. We will contact you soon.</p>
        <button onClick={closeSuccess}>Close</button>
      </div>
    </Modal>
  );
}
