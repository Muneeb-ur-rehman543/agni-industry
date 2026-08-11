import React, { useEffect, useState } from "react";
import "./Products.css";
import { Link } from "react-router-dom";

// Existing images
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

// Existing products
const oldProducts = [
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

const Products = () => {
  const [products, setProducts] = useState(oldProducts);
  const [loading, setLoading] = useState(true);

  // Fetch products from MongoDB
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/products"
        );

        const data = await response.json();

        if (data.success) {
          const mongoProducts = data.products.map((product) => ({
            id: product._id,
            name: product.name,
            price: Number(product.price),
            image: product.image,
            desc: product.description,
          }));

          // Existing + MongoDB products
          setProducts([...oldProducts, ...mongoProducts]);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="products-page">

      <h1>Our Products</h1>

      {loading && (
        <p style={{ color: "white", textAlign: "center" }}>
          Loading products...
        </p>
      )}

      <div className="products-grid">
        {products.map((item) => (
          <div className="product-card" key={item.id}>

            <img
              src={item.image}
              alt={item.name}
            />

            <h3>{item.name}</h3>

            <p>${Number(item.price).toFixed(2)}</p>

            <Link to={`/product/${item.id}`}>
              <button>
                View Details
              </button>
            </Link>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Products;