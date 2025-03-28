// import React, { useState } from "react";
// // import { useLocation } from "react-router-dom";
// // import { ProductContext } from "../context/ProductContext";
// // import ProductCard from "../components/ProductCard";
// import ProductFilter from "../components/ProductFilter";
// import ProductList from "../components/ProductList";

// const SearchResults = () => {
//   // const location = useLocation();
//   // const { products } = useContext(ProductContext);
//   const [searchTerm, setSearchTerm] = useState("");
//   // const category = new URLSearchParams(location.search).get("category") || "";

//   // const filteredProducts = products.filter((product) =>
//   //   product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   // );

//   return (
//     <div>
//       <h1>Kết quả tìm kiếm</h1>
//       <ProductFilter />
//       <ProductList />
//       <input
//         type="text"
//         placeholder="Tìm kiếm sản phẩm..."
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//       />
//       {/* <div className="product-list">
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))
//         ) : (
//           <p>Không tìm thấy sản phẩm nào</p>
//         )}
//       </div> */}
//     </div>
//   );
// };

// export default SearchResults;

import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import ProductFilter from "../components/ProductFilter";
import ProductList from "../components/ProductList";

const SearchResults = () => {
  const location = useLocation();
  const { products, searchQuery, setSearchQuery, setSelectedCategory, setSelectedMaterial, setPriceRange } = useContext(ProductContext); // Lấy danh sách sản phẩm từ Context
  const [filteredProducts, setFilteredProducts] = useState(products);
  // const [searchTerm, setSearchTerm] = useState("");

  // Lấy category từ URL (vd: /search?category=ring)
  // const category = new URLSearchParams(location.search).get("category") || "";

  // ✅ Reset bộ lọc & ô tìm kiếm khi load trang mới
  useEffect(() => {
    // setSearchTerm(""); // Reset ô tìm kiếm
    setSearchQuery(""); // Reset ô tìm kiếm
    setSelectedCategory("Tất cả"); // Reset danh mục
    setSelectedMaterial("Tất cả"); // Reset chất liệu
    setPriceRange([0, 2000]); // Reset khoảng giá về mặc định
  }, [location.pathname, location.search, setSearchQuery,setSelectedCategory, setSelectedMaterial, setPriceRange]); // 🛑 Khi pathname hoặc query thay đổi, reset

  useEffect(() => {
    console.log("🔍 searchQuery:", searchQuery);
    
    if (!searchQuery.trim()) {
      setFilteredProducts(products); // ✅ Trả về tất cả sản phẩm nếu searchQuery rỗng
    } else {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, products]);

  // useEffect(() => {
  //   setFilteredProducts(
  //     products.filter((product) =>
  //       product.name.toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  //   );
  // }, [searchQuery, products]);
  // ✅ Khi searchTerm rỗng, hiển thị tất cả sản phẩm
  // const filteredProducts = products.filter((product) => {
  //   const matchesCategory = category ? product.category === category : true;
  //   const matchesSearch = searchQuery ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) : true;
  //   // const matchesSearch = searchTerm
  //   //   ? product.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   //   : true; // Khi searchTerm rỗng, luôn trả về true (hiển thị tất cả)
    
  //   return matchesCategory && matchesSearch;
  // });
  return (
    <div>
      <h1>Kết quả tìm kiếm</h1>
      <ProductFilter />

      {/* Danh sách sản phẩm lọc được */}
      <ProductList products={filteredProducts} />
    </div>
  );
};

export default SearchResults;
