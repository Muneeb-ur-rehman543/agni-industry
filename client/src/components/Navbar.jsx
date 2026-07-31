import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext"; // ✅ IMPORT

function Navbar() {

  const { cart } = useContext(CartContext); // ✅ GET CART

  return (
    <header className="navbar">

      <div className="logo">
        <Link to="/">AGNI</Link>
      </div>

      <ul className="nav-links">

        <li><Link to="/">Home</Link></li>

        <li><Link to="/company">Company</Link></li>

        <li><Link to="/services">Services</Link></li>

        <li><Link to="/products">Products</Link></li>

        <li><Link to="/gallery">Gallery</Link></li>

        <li><Link to="/contact">Contact</Link></li>

        <li><Link to="/admin">Admin</Link></li>

        {/* ✅ NEW CART LINK */}
        <li>
          <Link to="/cart" className="cart-link">
            🛒 Cart ({cart.length})
          </Link>
        </li>

      </ul>

      <button className="quote-btn">
        Get Quote
      </button>

    </header>
  );
}

export default Navbar;