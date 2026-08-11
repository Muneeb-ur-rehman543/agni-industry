import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty!");
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
    <div style={{ padding: "120px 40px", color: "white" }}>
      <h1>Checkout</h1>

      {cart.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <button onClick={() => navigate("/products")}>
            Go to Products
          </button>
        </div>
      ) : (
        <>
          <h2>Order Summary</h2>

          {cart.map((item, index) => (
            <div key={index} style={{ marginBottom: "15px" }}>
              <strong>{item.name}</strong>
              <p>
                ${Number(item.price)} × {item.quantity || 1}
              </p>
            </div>
          ))}

          <h2>Total: ${total.toFixed(2)}</h2>

          <form
            onSubmit={handleSubmit}
            style={{
              maxWidth: "500px",
              marginTop: "30px",
            }}
          >
            <input
              type="text"
              name="customerName"
              placeholder="Your Name"
              value={formData.customerName}
              onChange={handleChange}
              required
            />

            <br />
            <br />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <br />
            <br />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />

            <br />
            <br />

            <textarea
              name="address"
              placeholder="Delivery Address"
              value={formData.address}
              onChange={handleChange}
              rows="5"
              required
            />

            <br />
            <br />

            <button type="submit" disabled={loading}>
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default Checkout;