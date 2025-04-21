// // import React, { useEffect, useState } from "react";
// // import { useDispatch, useSelector } from "react-redux";
// // import { useLocation } from "react-router-dom";
// // import { productsFetch } from "../slices/productsSlice";
// // import ProductFilter from "../components/ProductFilter";
// // import ProductList from "../components/ProductList";

// // const categoryMap = {
// //   ring: "nhẫn",
// //   bracelet: "lắc tay",
// //   necklace: "dây chuyền",
// //   earring: "bông tai",
// // };

// // const SearchResults = () => {
// //   const dispatch = useDispatch();
// //   const location = useLocation();

// //   // Lấy dữ liệu từ Redux
// //   const { items, status, error, searchQuery, selectedMaterial, priceRange } =
// //     useSelector((state) => state.products);

// //   // Lấy category từ URL query
// //   const queryParams = new URLSearchParams(location.search);
// //   const category = queryParams.get("category");

// //   // Map category tiếng Anh sang tiếng Việt
// //   const filterCategory = categoryMap[category];

// //   // Lọc sản phẩm theo category
// //   const [filteredProducts, setFilteredProducts] = useState(items);

// //   // Khi có thay đổi về sản phẩm hoặc các bộ lọc, cập nhật danh sách sản phẩm lọc
// //   useEffect(() => {
// //     if (status === "idle") {
// //       dispatch(productsFetch());
// //     }
// //   }, [dispatch, status]);

// //   // Xử lý bộ lọc khi có thay đổi
// //   useEffect(() => {
// //     let updatedProducts = items;

// //     // Lọc theo category nếu có
// //     if (filterCategory) {
// //       updatedProducts = updatedProducts.filter(
// //         (product) => product.category === filterCategory
// //       );
// //     }

// //     // Lọc theo searchQuery
// //     if (searchQuery.trim()) {
// //       updatedProducts = updatedProducts.filter((product) =>
// //         product.name.toLowerCase().includes(searchQuery.toLowerCase())
// //       );
// //     }

// //     // Lọc theo chất liệu
// //     if (selectedMaterial && selectedMaterial !== "Tất cả") {
// //       updatedProducts = updatedProducts.filter(
// //         (product) => product.material === selectedMaterial
// //       );
// //     }

// //     // Lọc theo giá
// //     if (priceRange) {
// //       updatedProducts = updatedProducts.filter(
// //         (product) =>
// //           product.price >= priceRange[0] && product.price <= priceRange[1]
// //       );
// //     }

// //     setFilteredProducts(updatedProducts);
// //   }, [items, searchQuery, filterCategory, selectedMaterial, priceRange]); // Đảm bảo rằng bạn đưa vào các biến phụ thuộc đúng

// //   // Hiển thị kết quả
// //   return (
// //     <div>
// //       <h1>Kết quả tìm kiếm</h1>

// //       {/* Hiển thị bộ lọc */}
// //       <ProductFilter />

// //       {/* Hiển thị danh sách sản phẩm đã lọc */}
// //       {status === "loading" && <p>Đang tải sản phẩm...</p>}
// //       {status === "failed" && <p>{error}</p>}
// //       {status === "succeeded" && <ProductList products={filteredProducts} />}
// //     </div>
// //   );
// // };

// // export default SearchResults;
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useLocation } from "react-router-dom";
// import { productsFetch } from "../slices/productsSlice";
// import ProductFilter from "../components/ProductFilter";
// import ProductList from "../components/ProductList";

// const categoryMap = {
//   ring: "nhẫn",
//   bracelet: "lắc tay",
//   necklace: "dây chuyền",
//   earring: "bông tai",
// };

// const SearchResults = () => {
//   const dispatch = useDispatch();
//   const location = useLocation();

//   // Lấy dữ liệu từ Redux
//   const { items, status, error, searchQuery, selectedMaterial, priceRange } =
//     useSelector((state) => state.products);
//   console.log(items);
//   // Lấy category từ URL query
//   const queryParams = new URLSearchParams(location.search);
//   const category = queryParams.get("category");

//   // Map category tiếng Anh sang tiếng Việt
//   const filterCategory = categoryMap[category];

//   // Lọc sản phẩm theo category
//   const [filteredProducts, setFilteredProducts] = useState(items);

//   // Khi có thay đổi về sản phẩm hoặc các bộ lọc, cập nhật danh sách sản phẩm lọc
//   useEffect(() => {
//     console.log("Effect triggered, status:", status);
//     if (status === "idle") {
//       dispatch(productsFetch());
//     }
//   }, [dispatch, status]);

//   // Xử lý bộ lọc khi có thay đổi
//   useEffect(() => {
//     let updatedProducts = items;

//     // Lọc theo category nếu có
//     if (filterCategory) {
//       updatedProducts = updatedProducts.filter(
//         (product) => product.category === filterCategory
//       );
//     }
//     // const filteredProducts = filterCategory
//     //   ? items.filter((product) => product.category === filterCategory)
//     //   : items;
//     // setFilteredProducts(filteredProducts);

//     // Lọc theo searchQuery
//     if (searchQuery.trim()) {
//       updatedProducts = updatedProducts.filter((product) =>
//         product.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//     }

//     // Lọc theo chất liệu
//     if (selectedMaterial && selectedMaterial !== "Tất cả") {
//       updatedProducts = updatedProducts.filter(
//         (product) => product.material === selectedMaterial
//       );
//     }

//     // Lọc theo giá
//     if (priceRange) {
//       updatedProducts = updatedProducts.filter(
//         (product) =>
//           product.price >= priceRange[0] && product.price <= priceRange[1]
//       );
//     }

//     setFilteredProducts(updatedProducts);
//   }, [items, searchQuery, filterCategory, selectedMaterial, priceRange]); // Đảm bảo rằng bạn đưa vào các biến phụ thuộc đúng

//   // Hiển thị kết quả
//   return (
//     <div>
//       <h1>Kết quả tìm kiếm</h1>

//       {/* Hiển thị bộ lọc */}
//       <ProductFilter />

//       {/* Hiển thị danh sách sản phẩm đã lọc */}
//       {status === "loading" && <p>Đang tải sản phẩm...</p>}
//       {status === "failed" && <p>{error}</p>}
//       {status === "succeeded" && <ProductList products={filteredProducts} />}
//     </div>
//   );
// };

// export default SearchResults;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { productsFetch } from "../slices/productsSlice";
import ProductFilter from "../components/ProductFilter";
import ProductList from "../components/ProductList";

const categoryMap = {
  ring: "nhẫn",
  bracelet: "lắc tay",
  necklace: "dây chuyền",
  earring: "bông tai",
};

const SearchResults = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { items, status, error, searchQuery, selectedMaterial, priceRange } =
    useSelector((state) => state.products);

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const filterCategory = categoryMap[category];

  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch sản phẩm nếu chưa có
  useEffect(() => {
    if (status === "idle") {
      dispatch(productsFetch());
    }
  }, [dispatch, status]);

  // Lọc sản phẩm khi có thay đổi về dữ liệu hoặc bộ lọc
  useEffect(() => {
    let updatedProducts = items;

    // Lọc theo category
    if (filterCategory) {
      updatedProducts = updatedProducts.filter(
        (product) => product.category === filterCategory
      );
      console.log("✅ After category filter:", updatedProducts);
    }

    // Lọc theo tên sản phẩm
    if (searchQuery && searchQuery.trim()) {
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Lọc theo chất liệu
    if (selectedMaterial && selectedMaterial !== "Tất cả") {
      updatedProducts = updatedProducts.filter(
        (product) => product.material === selectedMaterial
      );
    }

    // Lọc theo khoảng giá
    if (priceRange) {
      updatedProducts = updatedProducts.filter(
        (product) =>
          product.price >= priceRange[0] && product.price <= priceRange[1]
      );
    }
    console.log("🔵 Final filtered:", updatedProducts);

    setFilteredProducts(updatedProducts);
  }, [items, filterCategory, searchQuery, selectedMaterial, priceRange]);
  console.log("Filtered Products state: ", filteredProducts);

  return (
    <div>
      <ProductFilter />

      {/* Hiển thị kết quả */}
      {status === "loading" && <p>Đang tải sản phẩm...</p>}
      {status === "failed" && <p>{error}</p>}
      {status === "succeeded" && <ProductList products={filteredProducts} />}
    </div>
  );
};

export default SearchResults;
