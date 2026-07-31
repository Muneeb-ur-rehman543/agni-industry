import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import "./productDetail.css";

// ✅ correct image (YOUR FOLDER)
import jackets from "../assets/products/jackets.jpg";

function ProductDetail() {
  const { addToCart } = useContext(CartContext);

  const product = {
    id: 1,
    name: "Jackets",
    price: 60,
    desc: "Premium jackets",
    image: jackets
  };

  return (
    <div className="product-detail-page">
      <div className="product-detail-card">

        <img src={product.image} alt="" />

        <div className="details">
          <h2>{product.name}</h2>
          <h4>${product.price}</h4>
          <p>{product.desc}</p>

          <button onClick={() => addToCart(product)}>
            Add to Cart
          </button>
        </div>

      </div>
    </div>
  );
}

export default ProductDetail;