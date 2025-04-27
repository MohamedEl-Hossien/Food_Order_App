import classes from "./Modal.module.css";

export default function Modal({ children, onClose, ref }) {
  return (
    <dialog className={classes.modal} onClose={onClose} ref={ref}>
      {children}
    </dialog>
  );
}
