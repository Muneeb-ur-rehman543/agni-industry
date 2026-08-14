import "./Navbar.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { cart } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="navbar">

      <div className="logo">
        <Link to="/" onClick={closeMenu}>
          AGNI
        </Link>
      </div>

      {/* Desktop / Mobile Navigation */}
      <ul className={`nav-links ${menuOpen ? "mobile-open" : ""}`}>

        <li>
          <Link to="/" onClick={closeMenu}>
            Home
          </Link>
        </li>

        <li>
          <Link to="/company" onClick={closeMenu}>
            Company
          </Link>
        </li>

        <li>
          <Link to="/services" onClick={closeMenu}>
            Services
          </Link>
        </li>

        <li>
          <Link to="/products" onClick={closeMenu}>
            Products
          </Link>
        </li>

        <li>
          <Link to="/gallery" onClick={closeMenu}>
            Gallery
          </Link>
        </li>

        <li>
          <Link to="/contact" onClick={closeMenu}>
            Contact
          </Link>
        </li>

        <li>
          <Link to="/admin" onClick={closeMenu}>
            Admin
          </Link>
        </li>

        <li>
          <Link
            to="/cart"
            className="cart-link"
            onClick={closeMenu}
          >
            🛒 Cart ({cart.length})
          </Link>
        </li>

        {/* Get Quote on mobile menu */}
        <li className="mobile-quote-item">
          <button className="quote-btn">
            Get Quote
          </button>
        </li>

      </ul>

      {/* Desktop Quote */}
      <button className="quote-btn desktop-quote">
        Get Quote
      </button>

      {/* Hamburger */}
      <button
        className={`menu-toggle ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

    </header>
  );
}

export default Navbar;