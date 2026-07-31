import "./Admin.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Admin() {
  return (
    <>
      <Navbar />

      <section className="admin-page">

        <h1>Admin Panel</h1>
        <p>Manage Products & Orders</p>

        <div className="admin-container">

          <div className="product-form">

            <h2>Add New Product</h2>

            <input
              type="text"
              placeholder="Product Name"
            />

            <input
              type="text"
              placeholder="Category"
            />

            <input
              type="number"
              placeholder="Price"
            />

            <input
              type="file"
            />

            <textarea
              placeholder="Product Description"
              rows="5"
            ></textarea>

            <button>Add Product</button>

          </div>

          <div className="product-list">

            <h2>Uploaded Products</h2>

            <table>

              <thead>

                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>

              </thead>

              <tbody>

                <tr>
                  <td>Gym Wear</td>
                  <td>Sportswear</td>
                  <td>$25</td>
                  <td>Available</td>
                </tr>

                <tr>
                  <td>Football Jersey</td>
                  <td>Team Wear</td>
                  <td>$18</td>
                  <td>Available</td>
                </tr>

                <tr>
                  <td>Compression Shirt</td>
                  <td>Fitness</td>
                  <td>$20</td>
                  <td>Available</td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Admin;