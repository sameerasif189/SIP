import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { CartProvider } from "./context/CartContext";
import { TableProvider, useTable } from "./context/TableContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";

function RequireTable({ children }) {
  const { isSeated } = useTable();
  if (!isSeated) return <Navigate to="/welcome" replace />;
  return children;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

function AppRoutes() {
  const { isSeated } = useTable();

  return (
    <Routes>
      {/* Login page — entry point */}
      <Route
        path="/"
        element={isSeated ? <Navigate to="/home" replace /> : <Login />}
      />

      {/* Table selection — after login */}
      <Route
        path="/welcome"
        element={isSeated ? <Navigate to="/home" replace /> : <Welcome />}
      />

      {/* Main app layout — requires table selection */}
      <Route
        path="*"
        element={
          <RequireTable>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-1">
                <AnimatedRoutes />
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
