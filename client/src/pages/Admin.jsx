import { useEffect, useState } from "react";
import "./Admin.css";

function Admin() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);

  // ===============================
  // LOCAL BACKEND URL
  // ===============================
  const API_URL = "http://localhost:5000";

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

      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();

      if (data.success) {
        setOrders(data.orders || []);
      } else {
        console.error("Failed to fetch orders:", data.message);
        setOrders([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]);
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

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await response.json();

      if (data.success) {
        setProducts(data.products || []);
      } else {
        setProducts(data.products || data || []);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setProductsLoading(false);
    }
  };

  // ===============================
  // LOAD ORDERS + PRODUCTS
  // ===============================
  useEffect(() => {
    fetchOrders();
    fetchProducts();
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

        setProductName("");
        setCategory("");
        setPrice("");
        setDescription("");
        setImage("");

        // Refresh products after adding
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

      if (data.success) {
        setProducts((currentProducts) =>
          currentProducts.filter(
            (product) => String(product._id) !== String(productId)
          )
        );

        alert("Product deleted successfully.");
      } else {
        alert(data.message || "Failed to delete product.");
      }
    } catch (error) {
      console.error("Delete Product Error:", error);
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
            String(order._id) === String(orderId)
              ? {
                  ...order,
                  status: newStatus,
                }
              : order
          )
        );

        alert("Order status updated successfully!");
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
            (order) => String(order._id) !== String(orderId)
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
  // REFRESH ORDERS
  // ===============================
  const handleRefresh = () => {
    fetchOrders();
  };

  // ===============================
  // REFRESH PRODUCTS
  // ===============================
  const handleProductRefresh = () => {
    fetchProducts();
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
            />

            <button type="submit">
              Add Product
            </button>

          </form>
        </div>

        {/* ===============================
            PRODUCTS
        =============================== */}
        <div className="product-list">

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h2>Products</h2>

            <button
              type="button"
              onClick={handleProductRefresh}
              style={{
                padding: "10px 18px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              🔄 Refresh Products
            </button>
          </div>

          {/* PRODUCTS LOADING */}
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

                      {/* PRODUCT */}
                      <td>
                        <strong>
                          {product.name}
                        </strong>
                      </td>

                      {/* CATEGORY */}
                      <td>
                        {product.category}
                      </td>

                      {/* PRICE */}
                      <td>
                        <strong>
                          PKR{" "}
                          {Number(
                            product.price
                          ).toLocaleString()}
                        </strong>
                      </td>

                      {/* DESCRIPTION */}
                      <td>
                        {product.description || "N/A"}
                      </td>

                      {/* DELETE */}
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

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <h2>Customer Orders</h2>

            <button
              type="button"
              onClick={handleRefresh}
              style={{
                padding: "10px 18px",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              🔄 Refresh Orders
            </button>
          </div>

          {/* LOADING */}
          {loading ? (
            <p>Loading orders...</p>
          ) : orders.length === 0 ? (
            <div>
              <p>No orders placed yet.</p>

              <button
                type="button"
                onClick={handleRefresh}
                style={{
                  marginTop: "15px",
                  padding: "10px 18px",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Check Again
              </button>
            </div>
          ) : (
            <div className="orders-table-wrapper">

              <table>

                <thead>
                  <tr>
                    <th>Order ID</th>
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

                  {orders.map((order, index) => {

                    const orderId =
                      order._id || order.id || index + 1;

                    const customerName =
                      order.customerName ||
                      order.name ||
                      order.customer?.name ||
                      "Customer";

                    const email =
                      order.email ||
                      order.customerEmail ||
                      order.customer?.email ||
                      "No email";

                    const phone =
                      order.phone ||
                      order.customer?.phone ||
                      "N/A";

                    const address =
                      order.address ||
                      order.customer?.address ||
                      "N/A";

                    const items =
                      order.items ||
                      order.products ||
                      [];

                    const total =
                      order.total ||
                      order.totalPrice ||
                      order.amount ||
                      0;

                    const status =
                      order.status || "Pending";

                    return (
                      <tr key={String(orderId)}>

                        {/* ORDER ID */}
                        <td>
                          <strong>
                            #{String(orderId).slice(-8)}
                          </strong>
                        </td>

                        {/* CUSTOMER */}
                        <td>
                          <strong>
                            {customerName}
                          </strong>

                          <br />

                          <small>
                            {email}
                          </small>
                        </td>

                        {/* PRODUCTS */}
                        <td>
                          {items.length > 0 ? (
                            items.map(
                              (item, itemIndex) => (
                                <div
                                  key={itemIndex}
                                  style={{
                                    marginBottom: "5px",
                                  }}
                                >
                                  {item.name || "Product"}{" "}
                                  ×{" "}
                                  {item.quantity || 1}
                                </div>
                              )
                            )
                          ) : (
                            <span>
                              No product details
                            </span>
                          )}
                        </td>

                        {/* TOTAL */}
                        <td>
                          <strong>
                            PKR{" "}
                            {Number(total).toLocaleString()}
                          </strong>
                        </td>

                        {/* PHONE */}
                        <td>
                          {phone}
                        </td>

                        {/* ADDRESS */}
                        <td>
                          {address}
                        </td>

                        {/* DATE */}
                        <td>
                          {order.createdAt
                            ? new Date(
                                order.createdAt
                              ).toLocaleString()
                            : order.date
                            ? order.date
                            : "N/A"}
                        </td>

                        {/* STATUS */}
                        <td>

                          <select
                            value={status}
                            onChange={(e) =>
                              updateStatus(
                                orderId,
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
                              deleteOrder(orderId)
                            }
                          >
                            Delete
                          </button>

                        </td>

                      </tr>
                    );
                  })}

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