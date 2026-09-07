import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Backend URL
  // Local development:
  // VITE_API_URL=http://localhost:5000
  //
  // Vercel:
  // VITE_API_URL=https://your-server-url.vercel.app
  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

  // ========================================
  // HANDLE INPUT CHANGE
  // ========================================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setMessage("");
  };

  // ========================================
  // HANDLE REGISTER
  // ========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check empty fields
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setMessage("Please fill all fields");
      return;
    }

    // Check password match
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    // Minimum password length
    if (formData.password.length < 6) {
      setMessage("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.toLowerCase().trim(),
            password: formData.password,
          }),
        }
      );

      // Safely read response
      const data = await response.json();

      // ========================================
      // ERROR RESPONSE
      // ========================================
      if (!response.ok) {
        setMessage(
          data.message || "Registration failed"
        );
        return;
      }

      // ========================================
      // SUCCESS
      // ========================================
      setMessage(
        "Registration successful! Please login."
      );

      // Clear form
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Go to login
      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (error) {
      console.error("Registration Error:", error);

      setMessage(
        "Unable to connect to server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // UI
  // ========================================
  return (
    <div className="auth-page">
      <div className="auth-box">

        {/* Title */}
        <h2>Create Account</h2>

        <p className="auth-subtitle">
          Register for a new account
        </p>

        {/* Message */}
        {message && (
          <div className="auth-message">
            {message}
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="form-group">
            <label htmlFor="name">
              Name
            </label>

            <input
              id="name"
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              autoComplete="name"
            />
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              disabled={loading}
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              disabled={loading}
              autoComplete="new-password"
            />
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={loading}
              autoComplete="new-password"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>

        </form>

        {/* Login Link */}
        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;