import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./Checkout.css";

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * (item.quantity || 1),
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    // NAME: only letters and spaces
    if (name === "customerName") {
      newValue = value.replace(/[^A-Za-z\s]/g, "");

      if (value !== newValue) {
        setErrors((prev) => ({
          ...prev,
          customerName: "Invalid name. Please use letters only.",
        }));
      } else if (newValue.trim() !== "") {
        setErrors((prev) => ({
          ...prev,
          customerName: "",
        }));
      }
    }

    // PHONE: only numbers, spaces, +, -, brackets
    if (name === "phone") {
      newValue = value.replace(/[^0-9+\-\s()]/g, "");

      if (value !== newValue) {
        setErrors((prev) => ({
          ...prev,
          phone: "Invalid phone number.",
        }));
      } else if (newValue.trim() !== "") {
        setErrors((prev) => ({
          ...prev,
          phone: "",
        }));
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    // Clear other field errors when user starts correcting them
    if (name !== "customerName" && name !== "phone") {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.customerName.trim()) {
      newErrors.customerName = "Full name is required.";
    } else if (!/^[A-Za-z]+(?:\s+[A-Za-z]+)*$/.test(formData.customerName.trim())) {
      newErrors.customerName =
        "Invalid name. Please use letters only.";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9+\-\s()]{7,20}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Delivery address is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    // Stop submission if form is invalid
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const orderData = {
        ...formData,
        items: cart,
        total,
      };

      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Order placed successfully! 🎉");

        clearCart();
        navigate("/");
      } else {
        alert("Failed to place order.");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="checkout-container">

        {/* Page Heading */}
        <div className="checkout-heading">
          <h1>Checkout</h1>

          <div className="breadcrumb">
            <span onClick={() => navigate("/")}>Home</span>
            <b>›</b>
            <span onClick={() => navigate("/cart")}>Cart</span>
            <b>›</b>
            <strong>Checkout</strong>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="empty-checkout">
            <div className="empty-icon">🛒</div>

            <h2>Your Cart is Empty</h2>

            <p>
              Add some products before proceeding to checkout.
            </p>

            <button
              className="orange-btn"
              onClick={() => navigate("/products")}
            >
              Browse Products
            </button>
          </div>
        ) : (
          <div className="checkout-grid">

            {/* LEFT SIDE */}
            <div className="checkout-left">

              <div className="checkout-card">

                <div className="card-heading">
                  <div className="heading-icon">👤</div>

                  <div>
                    <h2>Shipping Information</h2>
                    <p>
                      Please enter your details to place your order
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>

                  {/* NAME + EMAIL */}
                  <div className="form-row">

                    {/* NAME */}
                    <div className="form-group">
                      <label>
                        Full Name <span>*</span>
                      </label>

                      <div
                        className={`input-wrapper ${
                          errors.customerName ? "input-error" : ""
                        }`}
                      >
                        <span>👤</span>

                        <input
                          type="text"
                          name="customerName"
                          placeholder="Enter your full name"
                          value={formData.customerName}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {errors.customerName && (
                        <p className="validation-error">
                          ⚠ {errors.customerName}
                        </p>
                      )}
                    </div>

                    {/* EMAIL */}
                    <div className="form-group">
                      <label>
                        Email Address <span>*</span>
                      </label>

                      <div
                        className={`input-wrapper ${
                          errors.email ? "input-error" : ""
                        }`}
                      >
                        <span>✉</span>

                        <input
                          type="email"
                          name="email"
                          placeholder="Enter your email address"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      {errors.email && (
                        <p className="validation-error">
                          ⚠ {errors.email}
                        </p>
                      )}
                    </div>

                  </div>

                  {/* PHONE */}
                  <div className="form-group">
                    <label>
                      Phone Number <span>*</span>
                    </label>

                    <div
                      className={`input-wrapper ${
                        errors.phone ? "input-error" : ""
                      }`}
                    >
                      <span>☎</span>

                      <input
                        type="text"
                        name="phone"
                        placeholder="Enter your phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    {errors.phone && (
                      <p className="validation-error">
                        ⚠ {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* ADDRESS */}
                  <div className="form-group">
                    <label>
                      Delivery Address <span>*</span>
                    </label>

                    <div
                      className={`textarea-wrapper ${
                        errors.address ? "input-error" : ""
                      }`}
                    >
                      <span>📍</span>

                      <textarea
                        name="address"
                        placeholder="Enter your complete delivery address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="5"
                        required
                      />
                    </div>

                    {errors.address && (
                      <p className="validation-error">
                        ⚠ {errors.address}
                      </p>
                    )}
                  </div>

                  {/* PLACE ORDER */}
                  <button
                    type="submit"
                    className="place-order-btn"
                    disabled={loading}
                  >
                    {loading
                      ? "Placing Order..."
                      : "🔒 Place Order"}
                  </button>

                </form>
              </div>

              {/* SECURITY BOX */}
              <div className="security-box">
                <div className="security-icon">🛡</div>

                <div>
                  <h3>Your security is our priority</h3>

                  <p>
                    Your information is safe and secure with us.
                    We never share your details.
                  </p>
                </div>
              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="checkout-right">

              <div className="order-card">

                <div className="card-heading">
                  <div className="heading-icon">🛍</div>

                  <div>
                    <h2>Order Summary</h2>

                    <p>
                      {cart.length} item
                      {cart.length > 1 ? "s" : ""} in your cart
                    </p>
                  </div>
                </div>

                {/* PRODUCTS */}
                <div className="order-items">

                  {cart.map((item, index) => (
                    <div
                      className="order-item"
                      key={index}
                    >

                      <div className="product-image">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                          />
                        ) : item.img ? (
                          <img
                            src={item.img}
                            alt={item.name}
                          />
                        ) : (
                          <span>📦</span>
                        )}
                      </div>

                      <div className="product-info">
                        <h3>{item.name}</h3>

                        <p>
                          ${Number(item.price).toFixed(2)} ×{" "}
                          {item.quantity || 1}
                        </p>
                      </div>

                      <strong className="item-price">
                        $
                        {(
                          Number(item.price) *
                          (item.quantity || 1)
                        ).toFixed(2)}
                      </strong>

                    </div>
                  ))}

                </div>

                {/* TOTALS */}
                <div className="price-details">

                  <div>
                    <span>Subtotal</span>
                    <strong>${total.toFixed(2)}</strong>
                  </div>

                  <div>
                    <span>Shipping</span>
                    <strong className="free">Free</strong>
                  </div>

                  <div className="total-row">
                    <span>Total</span>
                    <strong>${total.toFixed(2)}</strong>
                  </div>

                </div>

                {/* SECURE CHECKOUT */}
                <div className="secure-checkout">
                  <div className="secure-icon">🛡</div>

                  <div>
                    <h3>Secure Checkout</h3>

                    <p>
                      Your information is protected and secure.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        )}

        {/* FEATURES */}
        {cart.length > 0 && (
          <div className="checkout-features">

            <div className="feature">
              <span>🚚</span>
              <div>
                <h3>Fast Delivery</h3>
                <p>Get your products quickly</p>
              </div>
            </div>

            <div className="feature">
              <span>🛡</span>
              <div>
                <h3>Secure Payment</h3>
                <p>100% secure transactions</p>
              </div>
            </div>

            <div className="feature">
              <span>🎧</span>
              <div>
                <h3>24/7 Support</h3>
                <p>We're here to help</p>
              </div>
            </div>

            <div className="feature">
              <span>↩</span>
              <div>
                <h3>Easy Returns</h3>
                <p>Hassle-free returns</p>
              </div>
            </div>

          </div>
        )}

        <div className="checkout-footer">
          © 2025 AGNI Industry. All rights reserved.
        </div>

      </div>
    </div>
  );
}

export default Checkout;