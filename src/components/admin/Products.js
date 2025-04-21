import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { PrimaryButton } from "./CommonStyled";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8081/products", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch products");
      }

      const data = await response.json();
      setProducts(data.results || []);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/products/edit-product/${id}`);
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmed) return;

    try {
      const response = await fetch(
        `http://localhost:8081/delete-product/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete product");
      }

      // Xóa sản phẩm khỏi danh sách sau khi xóa thành công
      setProducts((prev) => prev.filter((prod) => prod.id !== id));
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px", position: "relative" }}>
      <Outlet />
      <h2>Products</h2>

      {/* Nút Create ở góc phải */}
      <div style={{ position: "absolute", top: "20px", right: "20px" }}>
        <PrimaryButton
          onClick={() => navigate("/admin/products/create-product")}
        >
          Create
        </PrimaryButton>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {products.length > 0 ? (
        <table border="1" cellPadding="8" cellSpacing="0">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Material</th>
              <th>Category</th>
              <th>Image</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.name}</td>
                <td>{prod.description}</td>
                <td>{prod.price}</td>
                <td>{prod.material}</td>
                <td>{prod.category}</td>
                <td>
                  <img src={prod.image} alt={prod.name} width="80" />
                </td>
                <td>
                  <input
                    type="button"
                    value="Edit"
                    onClick={() => handleEdit(prod.id)}
                  />
                </td>
                <td>
                  <input
                    type="button"
                    value="Delete"
                    onClick={() => handleDelete(prod.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default Products;
