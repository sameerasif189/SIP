import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import Home from "./pages/Home";
import CategoryMenu from "./pages/CategoryMenu";
import ItemDetail from "./pages/ItemDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmed from "./pages/OrderConfirmed";

function App() {
  return (
    <CartProvider>
      <OrderProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Home />} />
            <Route path="/category/:name" element={<CategoryMenu />} />
            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmed" element={<OrderConfirmed />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </OrderProvider>
    </CartProvider>
  );
}

export default App;
