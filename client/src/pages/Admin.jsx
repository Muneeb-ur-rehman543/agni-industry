import { useEffect, useState } from "react";
import "./Admin.css";

function Admin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Railway Backend URL
  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://agni-industry-production.up.railway.app";

  // Product form states
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

  useEffect(() => {
    fetchOrders();
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

      if (data.success) {
        alert("Product added successfully! 🎉");

        // Clear form
        setProductName("");
        setCategory("");
        setPrice("");
        setDescription("");
        setImage("");
      } else {
        alert(data.message || "Failed to add product.");
      }
    } catch (error) {
      console.error("Add Product Error:", error);
      alert("Server error. Please try again.");
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

  return (
    <section className="admin-page">
      <h1>Admin Panel</h1>
      <p>Manage Products & Orders</p>

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
                          {order.customerName}
                        </strong>

                        <br />

                        <small>
                          {order.email}
                        </small>
                      </td>

                      {/* PRODUCTS */}
                      <td>
                        {order.items?.map(
                          (item, index) => (
                            <div key={index}>
                              {item.name} ×{" "}
                              {item.quantity || 1}
                            </div>
                          )
                        )}
                      </td>

                      {/* TOTAL */}
                      <td>
                        $
                        {Number(
                          order.total || 0
                        ).toFixed(2)}
                      </td>

                      {/* PHONE */}
                      <td>
                        {order.phone}
                      </td>

                      {/* ADDRESS */}
                      <td>
                        {order.address}
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
                        </select>
                      </td>

                      {/* DELETE */}
                      <td>
                        <button
                          className="delete-order-btn"
                          onClick={() =>
                            deleteOrder(
                              order._id
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

      </div>
    </section>
  );
}

export default Admin;