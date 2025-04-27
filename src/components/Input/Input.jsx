import classes from "./Input.module.css";

export default function Input({ label, id, type, error, inputHook }) {
  return (
    <div className={classes.formGroup}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={id}
        value={inputHook.value}
        onChange={inputHook.valueChangeHandler}
        onBlur={inputHook.inputBlurHandler}
        required
      />
      {inputHook.hasError && <span className={classes.error}>{error}</span>}
    </div>
  );
}
