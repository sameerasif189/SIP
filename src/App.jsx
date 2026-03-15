import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { TableProvider, useTable } from "./context/TableContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";

function RequireTable({ children }) {
  const { isSeated } = useTable();
  if (!isSeated) return <Navigate to="/" replace />;
  return children;
}

function AppRoutes() {
  const { isSeated } = useTable();

  return (
    <Routes>
      {/* Welcome page is the landing — no navbar/footer */}
      <Route
        path="/"
        element={isSeated ? <Navigate to="/menu" replace /> : <Welcome />}
      />

      {/* Main app layout — requires table selection */}
      <Route
        path="*"
        element={
          <RequireTable>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/home" element={<Home />} />
                  <Route path="/menu" element={<MenuPage />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </RequireTable>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <TableProvider>
      <CartProvider>
        <Router>
          <AppRoutes />
        </Router>
      </CartProvider>
    </TableProvider>
  );
}

export default App;
