import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const { products, selectedCategory, selectedMaterial, priceRange, searchQuery } = useContext(ProductContext);

  // Áp dụng bộ lọc sản phẩm
  const filteredProducts = products.filter((product) => {
    return (
      (selectedCategory === "Tất cả" || product.category === selectedCategory) &&
      (selectedMaterial === "Tất cả" || product.material === selectedMaterial) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1] &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) // ✅ Lọc theo từ khóa tìm kiếm
    );
  });

  return (
    <div>
      <h2>Danh sách sản phẩm</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
        ) : (
          <p>Không có sản phẩm nào phù hợp.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
// import React, { useContext } from "react";
// import { ProductContext } from "../context/ProductContext";
// import ProductCard from "./ProductCard";

// const ProductList = () => {
//   const { products, loading } = useContext(ProductContext);

//   if (loading) return <p>Đang tải sản phẩm...</p>;

//   return (
//     <div>
//       <h2>Danh sách sản phẩm</h2>
//       <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
//         {products.length > 0 ? (
//           products.map((product) => <ProductCard key={product.id} product={product} />)
//         ) : (
//           <p>Không có sản phẩm nào phù hợp.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductList;
