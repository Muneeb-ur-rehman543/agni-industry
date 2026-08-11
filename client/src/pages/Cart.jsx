import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Cart() {
  const {
    cart,
    addToCart,
    removeFromCart,
  } = useContext(CartContext);

  const navigate = useNavigate();

  const total = cart.reduce(
    (sum, item) =>
      sum + Number(item.price) * (item.quantity || 1),
    0
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        padding: "120px 8% 60px",
      }}
    >
      <h1 style={{ marginBottom: "30px" }}>
        🛒 Your Cart
      </h1>

      {cart.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>

          <button
            onClick={() => navigate("/products")}
            style={{
              marginTop: "20px",
              padding: "12px 25px",
              background: "#f97316",
              color: "white",
              border: "none",
              borderRadius: "25px",
              cursor: "pointer",
            }}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <>
          {/* Cart Items */}
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "25px",
                background: "#0f172a",
                padding: "20px",
                marginBottom: "15px",
                borderRadius: "15px",
              }}
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100px",
                  height: "100px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />

              {/* Product Info */}
              <div style={{ flex: 1 }}>
                <h3>{item.name}</h3>

                <p style={{ color: "#38bdf8" }}>
                  ${Number(item.price).toFixed(2)}
                </p>
              </div>

              {/* Quantity */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <button
                  onClick={() => {
                    if ((item.quantity || 1) > 1) {
                      removeFromCart(item.id);
                      for (let i = 0; i < item.quantity - 1; i++) {
                        addToCart(item);
                      }
                    }
                  }}
                  style={{
                    padding: "6px 12px",
                    cursor: "pointer",
                  }}
                >
                  −
                </button>

                <span>{item.quantity || 1}</span>

                <button
                  onClick={() => addToCart(item)}
                  style={{
                    padding: "6px 12px",
                    cursor: "pointer",
                  }}
                >
                  +
                </button>
              </div>

              {/* Remove */}
              <button
                onClick={() => removeFromCart(item.id)}
                style={{
                  background: "#ef4444",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "20px",
                  cursor: "pointer",
                }}
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total */}
          <div
            style={{
              marginTop: "30px",
              textAlign: "right",
            }}
          >
            <h2>Total: ${total.toFixed(2)}</h2>

            {/* Checkout */}
            <button
              onClick={() => navigate("/checkout")}
              style={{
                marginTop: "15px",
                padding: "14px 30px",
                background: "#f97316",
                color: "white",
                border: "none",
                borderRadius: "25px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;