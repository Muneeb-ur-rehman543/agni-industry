import { useEffect, useState } from "react";
import "./Admin.css";

function Admin() {
  // ===============================
  // DATA STATES
  // ===============================

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [messages, setMessages] = useState([]);

  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(true);

  // ===============================
  // BACKEND URL
  // ===============================

  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://server-gilt-phi-18.vercel.app";

  // ===============================
  // PRODUCT FORM STATES
  // ===============================

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // ===============================
  // FETCH ORDERS
  // ===============================

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/orders`);
      const data = await response.json();

      console.log("ORDERS RESPONSE:", data);

      if (data.success) {
        setOrders(data.orders || []);
      } else {
        console.error("Failed to fetch orders:", data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // FETCH PRODUCTS
  // ===============================

  const fetchProducts = async () => {
    try {
      setProductsLoading(true);

      const response = await fetch(`${API_URL}/api/products`);
      const data = await response.json();

      console.log("PRODUCTS RESPONSE:", data);

      if (data.success) {
        setProducts(data.products || []);
      } else {
        console.error("Failed to fetch products:", data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setProductsLoading(false);
    }
  };

  // ===============================
  // FETCH CUSTOMER MESSAGES
  // ===============================

  const fetchMessages = async () => {
    try {
      setMessagesLoading(true);

      const response = await fetch(`${API_URL}/api/contact`);
      const data = await response.json();

      console.log("CONTACT RESPONSE:", data);

      if (data.success) {
        setMessages(data.messages || data.contacts || []);
      } else {
        console.error(
          "Failed to fetch customer messages:",
          data.message
        );
      }
    } catch (error) {
      console.error("Error fetching customer messages:", error);
    } finally {
      setMessagesLoading(false);
    }
  };

  // ===============================
  // LOAD EVERYTHING
  // ===============================

  useEffect(() => {
    fetchOrders();
    fetchProducts();
    fetchMessages();
  }, []);

  // ===============================
  // ADD PRODUCT
  // ===============================

  const addProduct = async (e) => {
    e.preventDefault();

    if (!productName || !category || !price) {
      alert("Please fill Product Name, Category and Price.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: productName,
          category,
          price: Number(price),
          image,
          description,
        }),
      });

      const data = await response.json();

      console.log("ADD PRODUCT RESPONSE:", data);

      if (data.success) {
        alert("Product added successfully! 🎉");

        // Clear form
        setProductName("");
        setCategory("");
        setPrice("");
        setDescription("");
        setImage("");

        // Refresh product list
        fetchProducts();
      } else {
        alert(data.message || "Failed to add product.");
      }
    } catch (error) {
      console.error("Add Product Error:", error);
      alert("Server error. Please try again.");
    }
  };

  // ===============================
  // DELETE PRODUCT
  // ===============================

  const deleteProduct = async (productId, productName) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${productName}"?`
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_URL}/api/products/${productId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      console.log("DELETE PRODUCT RESPONSE:", data);

      if (data.success) {
        setProducts((currentProducts) =>
          currentProducts.filter(
            (product) => product._id !== productId
          )
        );

        alert("Product deleted successfully.");
      } else {
        alert(data.message || "Failed to delete product.");
      }
    } catch (error) {
      console.error("Delete Product Error:", error);
      alert("Server error.");
    }
  };

  // ===============================
  // UPDATE ORDER STATUS
  // ===============================

  const updateStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `${API_URL}/api/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      console.log("STATUS RESPONSE:", data);

      if (data.success) {
        setOrders((currentOrders) =>
          currentOrders.map((order) =>
            order._id === orderId
              ? {
                  ...order,
                  status: newStatus,
                }
              : order
          )
        );
      } else {
        alert(data.message || "Failed to update status.");
      }
    } catch (error) {
      console.error("Status update error:", error);
      alert("Server error.");
    }
  };

  // ===============================
  // DELETE ORDER
  // ===============================

  const deleteOrder = async (orderId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(
        `${API_URL}/api/orders/${orderId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      console.log("DELETE ORDER RESPONSE:", data);

      if (data.success) {
        setOrders((currentOrders) =>
          currentOrders.filter(
            (order) => order._id !== orderId
          )
        );

        alert("Order deleted successfully.");
      } else {
        alert(data.message || "Failed to delete order.");
      }
    } catch (error) {
      console.error("Delete order error:", error);
      alert("Server error.");
    }
  };

  // ===============================
  // REFRESH ALL
  // ===============================

  const refreshAll = () => {
    fetchOrders();
    fetchProducts();
    fetchMessages();
  };

  return (
    <section className="admin-page">
      <h1>Admin Panel</h1>

      <p>
        Manage Products & Orders & Customer Messages
      </p>

      <div className="admin-container">

        {/* ===============================
            ADD PRODUCT
        =============================== */}

        <div className="product-form">
          <h2>Add New Product</h2>

          <form onSubmit={addProduct}>

            <input
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={(e) =>
                setProductName(e.target.value)
              }
            />

            <input
              type="text"
              placeholder="Category"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            />

            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
            />

            <input
              type="text"
              placeholder="Image URL (optional)"
              value={image}
              onChange={(e) =>
                setImage(e.target.value)
              }
            />

            <textarea
              placeholder="Product Description"
              rows="5"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
            ></textarea>

            <button type="submit">
              Add Product
            </button>

          </form>
        </div>

        {/* ===============================
            PRODUCTS
        =============================== */}

        <div className="product-list">

          <h2>Products</h2>

          {productsLoading ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <p>No products found.</p>
          ) : (
            <div className="orders-table-wrapper">

              <table>

                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {products.map((product) => (
                    <tr key={product._id}>

                      <td>
                        <strong>
                          {product.name}
                        </strong>
                      </td>

                      <td>
                        {product.category || "N/A"}
                      </td>

                      <td>
                        <strong>
                          PKR{" "}
                          {Number(
                            product.price || 0
                          ).toLocaleString()}
                        </strong>
                      </td>

                      <td>
                        {product.description || "N/A"}
                      </td>

                      <td>
                        <button
                          type="button"
                          className="delete-order-btn"
                          onClick={() =>
                            deleteProduct(
                              product._id,
                              product.name
                            )
                          }
                        >
                          Delete
                        </button>
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

        {/* ===============================
            CUSTOMER ORDERS
        =============================== */}

        <div className="product-list">

          <h2>Customer Orders</h2>

          {loading ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
            <p>No orders placed yet.</p>
          ) : (
            <div className="orders-table-wrapper">

              <table>

                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Products</th>
                    <th>Total</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>

                  {orders.map((order) => (

                    <tr key={order._id}>

                      {/* CUSTOMER */}

                      <td>

                        <strong>
                          {order.customerName ||
                            order.name ||
                            "Customer"}
                        </strong>

                        <br />

                        <small>
                          {order.email ||
                            order.customerEmail ||
                            "No email"}
                        </small>

                      </td>

                      {/* PRODUCTS */}

                      <td>

                        {(
                          order.items ||
                          order.products ||
                          []
                        ).map((item, index) => (

                          <div key={index}>
                            {item.name || "Product"} ×{" "}
                            {item.quantity || 1}
                          </div>

                        ))}

                      </td>

                      {/* TOTAL */}

                      <td>
                        PKR{" "}
                        {Number(
                          order.total ||
                            order.totalPrice ||
                            order.amount ||
                            0
                        ).toLocaleString()}
                      </td>

                      {/* PHONE */}

                      <td>
                        {order.phone || "N/A"}
                      </td>

                      {/* ADDRESS */}

                      <td>
                        {order.address || "N/A"}
                      </td>

                      {/* DATE */}

                      <td>
                        {order.createdAt
                          ? new Date(
                              order.createdAt
                            ).toLocaleDateString()
                          : "N/A"}
                      </td>

                      {/* STATUS */}

                      <td>

                        <select
                          value={
                            order.status || "Pending"
                          }
                          onChange={(e) =>
                            updateStatus(
                              order._id,
                              e.target.value
                            )
                          }
                        >

                          <option value="Pending">
                            Pending
                          </option>

                          <option value="Processing">
                            Processing
                          </option>

                          <option value="Shipped">
                            Shipped
                          </option>

                          <option value="Delivered">
                            Delivered
                          </option>

                          <option value="Cancelled">
                            Cancelled
                          </option>

                        </select>

                      </td>

                      {/* DELETE */}

                      <td>

                        <button
                          type="button"
                          className="delete-order-btn"
                          onClick={() =>
                            deleteOrder(order._id)
                          }
                        >
                          Delete
                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

        {/* ===============================
            CUSTOMER MESSAGES
        =============================== */}

        <div className="product-list">

          <h2>Customer Messages</h2>

          {messagesLoading ? (
            <p>Loading customer messages...</p>
          ) : messages.length === 0 ? (
            <p>No customer messages yet.</p>
          ) : (
            <div className="orders-table-wrapper">

              <table>

                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Message</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>

                  {messages.map((message, index) => (

                    <tr
                      key={
                        message._id || index
                      }
                    >

                      <td>
                        <strong>
                          {message.name ||
                            message.customerName ||
                            "Customer"}
                        </strong>
                      </td>

                      <td>
                        {message.email ||
                          "No email"}
                      </td>

                      <td>
                        {message.message ||
                          "No message"}
                      </td>

                      <td>
                        {message.createdAt
                          ? new Date(
                              message.createdAt
                            ).toLocaleDateString()
                          : "N/A"}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

        {/* ===============================
            REFRESH
        =============================== */}

        <div className="product-list">

          <h2>Admin Data</h2>

          <button
            type="button"
            onClick={refreshAll}
            style={{
              padding: "12px 20px",
              border: "none",
              borderRadius: "8px",
              background: "#ff6b00",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            🔄 Refresh Data
          </button>

        </div>

      </div>
    </section>
  );
}

export default Admin;