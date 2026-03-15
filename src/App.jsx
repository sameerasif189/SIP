import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { TableProvider } from "./context/TableContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";

function App() {
  return (
    <TableProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Welcome page — no navbar/footer */}
            <Route path="/welcome" element={<Welcome />} />

            {/* Main app layout */}
            <Route
              path="*"
              element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-1">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/menu" element={<MenuPage />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/contact" element={<Contact />} />
                    </Routes>
                  </main>
                  <Footer />
                </div>
              }
            />
          </Routes>
        </Router>
      </CartProvider>
    </TableProvider>
  );
}

export default App;
