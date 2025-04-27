import { useState } from "react";

export default function useInput(
  initialValue = "",
  validiationFn = () => true
) {
  const [value, setValue] = useState(initialValue);
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = value.trim() !== "" && validiationFn(value);
  const hasError = !valueIsValid && isTouched;

  function valueChangeHandler(event) {
    setValue(event.target.value);
    setIsTouched(false);
  }

  function inputBlurHandler(event) {
    setIsTouched(event.target.value.length > 0);
  }

  function reset() {
    setValue(initialValue);
    setIsTouched(false);
  }

  return {
    value,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
}
