import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./productDetail.css";

// Product images
import cap from "../assets/products/cap.jpg";
import hoodie from "../assets/products/hoodie.jpg";
import jackets from "../assets/products/jackets.jpg";
import jeans from "../assets/products/jeans.jpg";
import kids from "../assets/products/kids.jpg";
import kurta from "../assets/products/kurta.jpg";
import shirt from "../assets/products/shirt.jpg";
import shorts from "../assets/products/shorts.jpg";
import sweater from "../assets/products/sweater.jpg";
import tshirt from "../assets/products/tshirt.jpg";

const products = [
  {
    id: 1,
    name: "Cap",
    price: 10,
    image: cap,
    desc: "Stylish cap for daily wear. Lightweight and comfortable.",
  },
  {
    id: 2,
    name: "Hoodie",
    price: 40,
    image: hoodie,
    desc: "Warm hoodie perfect for winter with modern design.",
  },
  {
    id: 3,
    name: "Jackets",
    price: 60,
    image: jackets,
    desc: "Premium jackets for a stylish and bold look.",
  },
  {
    id: 4,
    name: "Jeans",
    price: 35,
    image: jeans,
    desc: "Slim fit jeans made with high-quality denim.",
  },
  {
    id: 5,
    name: "Kids Wear",
    price: 25,
    image: kids,
    desc: "Comfortable and colorful outfits for kids.",
  },
  {
    id: 6,
    name: "Kurta",
    price: 30,
    image: kurta,
    desc: "Traditional kurta perfect for formal occasions.",
  },
  {
    id: 7,
    name: "Shirt",
    price: 20,
    image: shirt,
    desc: "Casual shirt for everyday fashion.",
  },
  {
    id: 8,
    name: "Shorts",
    price: 15,
    image: shorts,
    desc: "Lightweight shorts for summer comfort.",
  },
  {
    id: 9,
    name: "Sweater",
    price: 45,
    image: sweater,
    desc: "Soft and warm sweater for cold weather.",
  },
  {
    id: 10,
    name: "T-Shirt",
    price: 18,
    image: tshirt,
    desc: "Premium cotton t-shirt with perfect fit.",
  },
];

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const product = products.find(
    (item) => item.id === Number(id)
  );

  // ===============================
  // ADD TO CART
  // ===============================
  const handleAddToCart = () => {
    // Check the same login storage used by Login.jsx
    const loggedInUser = localStorage.getItem("user");

    if (!loggedInUser) {
      alert("Please login first to add products to cart! 🔐");
      navigate("/login");
      return;
    }

    // User is logged in
    addToCart(product);

    alert("Product added to cart! 🛒");
  };

  // ===============================
  // PRODUCT NOT FOUND
  // ===============================
  if (!product) {
    return (
      <div
        style={{
          padding: "120px 40px",
          color: "white",
        }}
      >
        <h2>Product not found</h2>
      </div>
    );
  }

  return (
    <div className="product-detail-page">

      <div className="product-detail-container">

        {/* PRODUCT IMAGE */}
        <div className="product-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>

        {/* PRODUCT DETAILS */}
        <div className="details">

          <h2>{product.name}</h2>

          <h4>${product.price}</h4>

          <p>{product.desc}</p>

          <button onClick={handleAddToCart}>
            Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductDetail;