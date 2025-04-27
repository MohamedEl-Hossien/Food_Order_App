import { createContext, useRef } from "react";

const ProgressContext = createContext({
  cartDiaolg: null,
  formDiaolg: null,
  successDiaolg: null,
  openCart: () => {},
  closeCart: () => {},
  openForm: () => {},
  closeForm: () => {},
  openSuccess: () => {},
  closeSuccess: () => {},
});

export default function ProgressProvider({ children }) {
  const cartDiaolg = useRef();
  const formDiaolg = useRef();
  const successDiaolg = useRef();

  function openCart() {
    cartDiaolg.current.showModal();
  }

  function closeCart() {
    cartDiaolg.current.close();
  }

  function openForm() {
    cartDiaolg.current.close();
    formDiaolg.current.showModal();
  }

  function closeForm() {
    formDiaolg.current.close();
  }

  function openSuccess() {
    formDiaolg.current.close();
    successDiaolg.current.showModal();
  }

  function closeSuccess() {
    successDiaolg.current.close();
  }

  return (
    <ProgressContext.Provider
      value={{
        cartDiaolg,
        openCart,
        closeCart,
        formDiaolg,
        openForm,
        closeForm,
        successDiaolg,
        openSuccess,
        closeSuccess,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export { ProgressContext };
