import { useContext } from "react";
import { CartContext } from "../context/CartContext";

function Cart() {
  const { cart } = useContext(CartContext);

  return (
    <div style={{ padding: "100px 40px", color: "white" }}>
      <h2>🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        cart.map((item, i) => (
          <div key={i} style={{ margin: "20px 0" }}>
            <h4>{item.name}</h4>
            <p>${item.price}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Cart;