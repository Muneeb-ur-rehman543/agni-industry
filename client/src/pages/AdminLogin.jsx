import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Admin credentials
    const adminEmail = "admin@agni.com";
    const adminPassword = "admin123";

    if (email === adminEmail && password === adminPassword) {
      localStorage.setItem("adminLoggedIn", "true");

      alert("Admin login successful! 🎉");

      window.location.href = "/admin";
    } else {
      alert("Invalid Admin Email or Password ❌");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">

        <div className="admin-login-icon">
          🔐
        </div>

        <h1>Admin Login</h1>

        <p>Login to access the AGNI Admin Panel</p>

        <form onSubmit={handleLogin}>

          <div className="admin-input-group">
            <label>Admin Email</label>

            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="admin-input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="admin-login-btn">
            Login as Admin
          </button>

        </form>

      </div>
    </div>
  );
}

export default AdminLogin;