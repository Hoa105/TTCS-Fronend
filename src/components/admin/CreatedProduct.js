import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [productImg, setProductImg] = useState(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [material, setMaterial] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProductImg(file);
    } else {
      setProductImg(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", desc);
    formData.append("price", price);
    formData.append("material", material);
    formData.append("category", category);
    if (productImg) {
      formData.append("image", productImg); // append image file directly
    }

    try {
      const res = await fetch("http://localhost:8081/create-product", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to create product");

      const data = await res.json();
      console.log("Product created:", data);

      alert("Product created successfully!");
      navigate("/admin/products");
    } catch (err) {
      console.error("Error:", err);
      alert("Failed to create product");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <form onSubmit={handleSubmit} className="style">
        <h3>Create a Product</h3>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />

        <input
          type="text"
          placeholder="Short Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        />
        <br />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <br />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={{ width: "400", height: "50px" }}
        >
          <option value="">Select Category</option>
          <option value="nhẫn">Nhẫn</option>
          <option value="lắc tay">Lắc tay</option>
          <option value="dây chuyền">Dây chuyền</option>
          <option value="bông tai">Bông tai</option>
        </select>
        <br />

        <select
          value={material}
          onChange={(e) => setMaterial(e.target.value)}
          required
          style={{ width: "400", height: "50px" }}
        >
          <option value="">Select Material</option>
          <option value="vàng">Vàng</option>
          <option value="bạc">Bạc</option>
          <option value="kim cương">Kim cương</option>
        </select>
        <br />

        <input
          accept="image/*"
          type="file"
          onChange={handleProductImageUpload}
          required
        />
        <br />

        <button type="submit">Submit</button>
      </form>

      <div style={{ marginLeft: "2rem", marginTop: "5rem" }}>
        {productImg ? (
          <img
            src={URL.createObjectURL(productImg)}
            alt="Preview"
            style={{ maxWidth: "300px" }}
          />
        ) : (
          <p>Product image upload preview will appear here!</p>
        )}
      </div>
    </div>
  );
};

export default CreateProduct;
