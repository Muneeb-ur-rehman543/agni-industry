import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

function Navbar() {
  const { cart } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  // Get logged-in user
  const getUser = () => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("User data error:", error);
      return null;
    }
  };

  const user = getUser();

  // Check admin login
  const isAdminLoggedIn =
    localStorage.getItem("adminLoggedIn") === "true";

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // User logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    closeMenu();
    navigate("/login");
    window.location.reload();
  };

  // Admin logout
  const handleAdminLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    closeMenu();
    navigate("/admin-login");
    window.location.reload();
  };

  // Get user's name
  const userName =
    user?.name ||
    user?.username ||
    user?.fullName ||
    "User";

  return (
    <header className="navbar">

      {/* Logo */}
      <div className="logo">
        <Link to="/" onClick={closeMenu}>
          AGNI
        </Link>
      </div>

      {/* Navigation */}
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

        {/* Admin */}
        <li>
          <Link
            to={isAdminLoggedIn ? "/admin" : "/admin-login"}
            onClick={closeMenu}
          >
            Admin
          </Link>
        </li>

        {/* Cart */}
        <li>
          <Link
            to="/cart"
            className="cart-link"
            onClick={closeMenu}
          >
            🛒 Cart ({cart.length})
          </Link>
        </li>

      </ul>

      {/* =========================
          USER / ADMIN LOGIN
      ========================= */}

      {isAdminLoggedIn ? (
        <div className="user-menu desktop-quote">

          <span className="user-name">
            🔐 Admin
          </span>

          <button
            className="logout-btn"
            onClick={handleAdminLogout}
          >
            Admin Logout
          </button>

        </div>
      ) : user ? (
        <div className="user-menu desktop-quote">

          <span className="user-name">
            👤 {userName}
          </span>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>
      ) : (
        <Link
          to="/login"
          className="quote-btn desktop-quote"
          onClick={closeMenu}
        >
          Login
        </Link>
      )}

      {/* Mobile Menu Button */}
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