import { useState } from "react";
import { Link } from "react-router-dom";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  // ========================================
  // VERCEL BACKEND URL
  // ========================================
  const API_URL = "https://server-gilt-phi-18.vercel.app";

  // ========================================
  // STEP 1 - SEND OTP
  // ========================================
  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to send OTP");
        return;
      }

      alert("OTP sent successfully to your email 📧");

      setStep(2);
    } catch (error) {
      console.error("SEND OTP ERROR:", error);

      alert(
        "Unable to connect to server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // STEP 2 - VERIFY OTP
  // ========================================
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      alert("Please enter OTP");
      return;
    }

    if (otp.length !== 6) {
      alert("OTP must be 6 digits");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            otp: otp.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Invalid OTP");
        return;
      }

      alert("OTP verified successfully ✅");

      setStep(3);
    } catch (error) {
      console.error("VERIFY OTP ERROR:", error);

      alert(
        "Unable to connect to server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // STEP 3 - RESET PASSWORD
  // ========================================
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim().toLowerCase(),
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to reset password");
        return;
      }

      alert("Password reset successfully! ✅");

      window.location.href = "/login";
    } catch (error) {
      console.error("RESET PASSWORD ERROR:", error);

      alert(
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
    <div className="forgot-page">
      <div className="forgot-card">

        {/* =================================
            STEP 1
        ================================= */}
        {step === 1 && (
          <>
            <h2>Forgot Password?</h2>

            <p className="forgot-subtitle">
              Enter your registered email and we'll
              send you an OTP.
            </p>

            <form onSubmit={handleEmailSubmit}>
              <label>Email Address</label>

              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                disabled={loading}
                required
              />

              <button
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Sending OTP..."
                  : "Send OTP"}
              </button>
            </form>
          </>
        )}

        {/* =================================
            STEP 2
        ================================= */}
        {step === 2 && (
          <>
            <h2>Verify OTP</h2>

            <p className="forgot-subtitle">
              Enter the 6-digit OTP sent to:
              <br />
              <strong>{email}</strong>
            </p>

            <form onSubmit={handleOtpSubmit}>
              <label>OTP</label>

              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                value={otp}
                onChange={(e) =>
                  setOtp(
                    e.target.value.replace(/\D/g, "")
                  )
                }
                disabled={loading}
                required
              />

              <button
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Verifying..."
                  : "Verify OTP"}
              </button>
            </form>
          </>
        )}

        {/* =================================
            STEP 3
        ================================= */}
        {step === 3 && (
          <>
            <h2>Reset Password</h2>

            <p className="forgot-subtitle">
              Create your new password.
            </p>

            <form onSubmit={handleResetPassword}>
              <label>New Password</label>

              <input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                disabled={loading}
                autoComplete="new-password"
                required
              />

              <label>Confirm Password</label>

              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                disabled={loading}
                autoComplete="new-password"
                required
              />

              <button
                type="submit"
                disabled={loading}
              >
                {loading
                  ? "Resetting..."
                  : "Reset Password"}
              </button>
            </form>
          </>
        )}

        {/* Back to Login */}
        <div className="back-login">
          <Link to="/login">
            ← Back to Login
          </Link>
        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;