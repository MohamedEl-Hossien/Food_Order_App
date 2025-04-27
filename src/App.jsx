import CartProvider from "./store/CartContext.jsx";
import ProgressProvider from "./store/ProgressContext.jsx";
import Header from "./components/Header/Header.jsx";
import Menu from "./components/Menu/Menu.jsx";
import Cart from "./components/Cart/Cart.jsx";
import FormSubmit from "./components/FormSubmit/FormSubmit.jsx";
import SuccededSubmit from "./components/SuccededSubmit/SuccededSubmit.jsx";

function App() {
  return (
    <CartProvider>
      <ProgressProvider>
        <Header />
        <Menu />
        <Cart />
        <FormSubmit />
        <SuccededSubmit />
      </ProgressProvider>
      <div className="footer">
        <p>&copy; 2025 Voda Food. All rights reserved.</p>
      </div>
    </CartProvider>
  );
}

export default App;
