const express = require("express");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const router = express.Router();

// ========================================
// GMAIL TRANSPORTER
// ========================================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ========================================
// 1. REGISTER
// ========================================
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // Clean email
    const cleanEmail = email.toLowerCase().trim();

    // Check if account already exists
    const existingUser = await User.findOne({
      email: cleanEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name: name.trim(),
      email: cleanEmail,
      password: hashedPassword,
    });

    console.log("New user registered:", user.email);

    res.status(201).json({
      message: "Registration successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      message: "Server error during registration",
    });
  }
});

// ========================================
// 2. LOGIN
// ========================================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check required fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Clean email
    const cleanEmail = email.toLowerCase().trim();

    // Find user
    const user = await User.findOne({
      email: cleanEmail,
    });

    // User doesn't exist
    if (!user) {
      return res.status(404).json({
        message: "Account with this email does not exist",
      });
    }

    // Compare password with hashed password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    // Wrong password
    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Incorrect password",
      });
    }

    // Login successful
    console.log("User logged in:", user.email);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      message: "Server error during login",
    });
  }
});

// ========================================
// 3. SEND OTP - FORGOT PASSWORD
// ========================================
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    // Check email
    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    // Clean email
    const cleanEmail = email.toLowerCase().trim();

    // Find user
    const user = await User.findOne({
      email: cleanEmail,
    });

    // User doesn't exist
    if (!user) {
      return res.status(404).json({
        message: "User with this email does not exist",
      });
    }

    // Generate 6 digit OTP
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    // Save OTP
    user.resetOTP = otp;

    // OTP expires after 10 minutes
    user.resetOTPExpiry = new Date(
      Date.now() + 10 * 60 * 1000
    );

    await user.save();

    // Send OTP email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "AGNI Industry - Password Reset OTP",
      text: `Your password reset OTP is ${otp}. This OTP will expire in 10 minutes.`,
    });

    console.log("OTP sent to:", user.email);

    res.status(200).json({
      message: "OTP sent successfully to your email",
    });
  } catch (error) {
    console.error("SEND OTP ERROR:", error);

    res.status(500).json({
      message: "Failed to send OTP",
    });
  }
});

// ========================================
// 4. VERIFY OTP
// ========================================
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Check fields
    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required",
      });
    }

    // Clean email
    const cleanEmail = email.toLowerCase().trim();

    // Find user
    const user = await User.findOne({
      email: cleanEmail,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Check OTP exists
    if (!user.resetOTP || !user.resetOTPExpiry) {
      return res.status(400).json({
        message: "OTP not requested",
      });
    }

    // Check expiry
    if (new Date() > user.resetOTPExpiry) {
      return res.status(400).json({
        message: "OTP has expired",
      });
    }

    // Check OTP
    if (user.resetOTP !== otp.toString().trim()) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    console.log("OTP verified for:", user.email);

    res.status(200).json({
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("VERIFY OTP ERROR:", error);

    res.status(500).json({
      message: "Failed to verify OTP",
    });
  }
});

// ========================================
// 5. RESET PASSWORD
// ========================================
router.post("/reset-password", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check fields
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // Clean email
    const cleanEmail = email.toLowerCase().trim();

    // Find user
    const user = await User.findOne({
      email: cleanEmail,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Update password
    user.password = hashedPassword;

    // Clear OTP
    user.resetOTP = null;
    user.resetOTPExpiry = null;

    await user.save();

    console.log("Password reset for:", user.email);

    res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("RESET PASSWORD ERROR:", error);

    res.status(500).json({
      message: "Failed to reset password",
    });
  }
});

module.exports = router;

