import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Company from "./pages/Company";
import Services from "./components/Services";
import Gallery from "./pages/Gallery";
import Admin from "./pages/Admin";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";

// Login, Register & Forgot Password
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

// Context
import CartProvider from "./context/CartContext";

// Product Detail
import ProductDetail from "./components/ProductDetail";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>

        {/* Navbar always visible */}
        <Navbar />

        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/company" element={<Company />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />

          {/* Login, Register & Forgot Password */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Product Detail */}
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* Cart */}
          <Route path="/cart" element={<Cart />} />

          {/* Checkout */}
          <Route path="/checkout" element={<Checkout />} />
        </Routes>

      </BrowserRouter>
    </CartProvider>
  );
}

export default App;