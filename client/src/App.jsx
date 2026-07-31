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
import Cart from "./pages/Cart"; // ✅ NEW

// Context
import CartProvider from "./context/CartContext"; // ✅ NEW

// Product Detail
import ProductDetail from "./components/ProductDetail";

function App() {
  return (
    <CartProvider> {/* ✅ WRAP WHOLE APP */}

      <BrowserRouter>

        {/* Navbar always visible */}
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/company" element={<Company />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />

          {/* Product Detail */}
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* ✅ CART ROUTE */}
          <Route path="/cart" element={<Cart />} />

        </Routes>

      </BrowserRouter>

    </CartProvider>
  );
}

export default App;