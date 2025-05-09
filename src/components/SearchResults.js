import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { productsFetch } from "../slices/productsSlice";
import ProductFilter from "./ProductFilter";
import ProductList from "./ProductList";

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

    setFilteredProducts(updatedProducts);
  }, [items, filterCategory, searchQuery, selectedMaterial, priceRange]);

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
