// // // import React, { useContext } from "react";
// // // import { ProductContext } from "../context/ProductContext";
// // // import ProductCard from "./ProductCard";

// // // const ProductList = () => {
// // //   const {
// // //     products,
// // //     selectedCategory,
// // //     selectedMaterial,
// // //     priceRange,
// // //     searchQuery,
// // //   } = useContext(ProductContext);

// // //   // Áp dụng bộ lọc sản phẩm
// // //   const filteredProducts = products.filter((product) => {
// // //     const matchCategory =
// // //       selectedCategory === "Tất cả" || product.category === selectedCategory;

// // //     const matchMaterial =
// // //       selectedMaterial === "Tất cả" || product.material === selectedMaterial;

// // //     const matchPrice =
// // //       product.price >= priceRange[0] && product.price <= priceRange[1];

// // //     const matchSearch = product.name
// // //       ?.toLowerCase()
// // //       .includes(searchQuery?.toLowerCase() || "");

// // //     return matchCategory && matchMaterial && matchPrice && matchSearch;
// // //   });

// // //   return (
// // //     <div>
// // //       <h2>Danh sách sản phẩm</h2>
// // //       <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
// // //         {filteredProducts.length > 0 ? (
// // //           filteredProducts.map((product) => (
// // //             <ProductCard key={product.id} product={product} />
// // //           ))
// // //         ) : (
// // //           <p>Không có sản phẩm nào phù hợp.</p>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default ProductList;
// // // // import React, { useContext } from "react";
// // // // import { ProductContext } from "../context/ProductContext";
// // // // import ProductCard from "./ProductCard";

// // // // const ProductList = () => {
// // // //   const { products, loading } = useContext(ProductContext);

// // // //   if (loading) return <p>Đang tải sản phẩm...</p>;

// // // //   return (
// // // //     <div>
// // // //       <h2>Danh sách sản phẩm</h2>
// // // //       <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
// // // //         {products.length > 0 ? (
// // // //           products.map((product) => <ProductCard key={product.id} product={product} />)
// // // //         ) : (
// // // //           <p>Không có sản phẩm nào phù hợp.</p>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default ProductList;
// // import React, { useEffect } from "react";
// // import { useSelector, useDispatch } from "react-redux";
// // import { productsFetch } from "../slices/productsSlice";
// // import ProductCard from "./ProductCard";

// // const ProductList = () => {
// //   const dispatch = useDispatch();

// //   const products = useSelector((state) => state.products.items);
// //   const status = useSelector((state) => state.products.status);
// //   const error = useSelector((state) => state.products.error);
// //   const selectedMaterial = useSelector(
// //     (state) => state.products.selectedMaterial
// //   );
// //   const priceRange = useSelector((state) => state.products.priceRange);
// //   const searchQuery = useSelector((state) => state.products.searchQuery);

// //   useEffect(() => {
// //     if (status === "idle") {
// //       dispatch(productsFetch());
// //     }
// //   }, [dispatch, status]);

// //   const filteredProducts = products.filter((product) => {
// //     const matchMaterial =
// //       selectedMaterial === "Tất cả" || product.material === selectedMaterial;

// //     const matchPrice =
// //       product.price >= priceRange[0] && product.price <= priceRange[1];

// //     const matchSearch = product.name
// //       ?.toLowerCase()
// //       .includes(searchQuery?.toLowerCase() || "");

// //     return matchMaterial && matchPrice && matchSearch;
// //   });

// //   if (status === "loading") return <p>Đang tải sản phẩm...</p>;
// //   if (status === "failed") return <p style={{ color: "red" }}>❌ {error}</p>;

// //   return (
// //     <div>
// //       <h2>Danh sách sản phẩm</h2>
// //       <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
// //         {filteredProducts.length > 0 ? (
// //           filteredProducts.map((product) => (
// //             <ProductCard key={product.id} product={product} />
// //           ))
// //         ) : (
// //           <p>Không có sản phẩm nào phù hợp.</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default ProductList;
// // src/components/ProductList.js
// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { productsFetch } from "../slices/productsSlice";
// import ProductCard from "./ProductCard";

// const ProductList = () => {
//   const dispatch = useDispatch();

//   const products = useSelector((state) => state.products.items);
//   const status = useSelector((state) => state.products.status);
//   const error = useSelector((state) => state.products.error);
//   const selectedMaterial = useSelector(
//     (state) => state.products.selectedMaterial
//   );
//   const priceRange = useSelector((state) => state.products.priceRange);

//   useEffect(() => {
//     dispatch(productsFetch());
//   }, [dispatch]);

//   if (status === "loading") return <p>Đang tải sản phẩm...</p>;
//   if (status === "failed") return <p style={{ color: "red" }}>❌ {error}</p>;

//   const filteredProducts = products.filter((product) => {
//     const matchMaterial =
//       selectedMaterial === "Tất cả" || product.material === selectedMaterial;

//     const matchPrice =
//       Array.isArray(priceRange) &&
//       priceRange.length === 2 &&
//       product.price >= priceRange[0] &&
//       product.price <= priceRange[1];

//     return matchMaterial && matchPrice;
//   });

//   return (
//     <div>
//       <h2>Danh sách sản phẩm</h2>
//       <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((product) => (
//             <ProductCard key={product.id} product={product} />
//           ))
//         ) : (
//           <p>Không có sản phẩm nào phù hợp.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductList;
import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
  // Kiểm tra nếu products là mảng và có ít nhất 1 sản phẩm
  if (!Array.isArray(products) || products.length === 0) {
    return <p>Không có sản phẩm nào phù hợp.</p>;
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
