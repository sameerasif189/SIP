import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import Scan from "./pages/Scan";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import ItemDetail from "./pages/ItemDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <CartProvider>
      <OrderProvider>
        <Router>
          <Routes>
            <Route path="/scan" element={<Scan />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/" element={<Home />} />
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </OrderProvider>
    </CartProvider>
  );
}

export default App;
