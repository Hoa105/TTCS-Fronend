import React, { useContext } from "react";
// import { useState } from "react";
import { ProductContext } from "../context/ProductContext";

const ProductFilter = () => {
  // const [price, setPrice] = useState("100-500");
  const {
    // selectedCategory,
    // setSelectedCategory,
    selectedMaterial,
    setSelectedMaterial,
    priceRange, 
    setPriceRange
  } = useContext(ProductContext);

  return (
    <div style={{ fontSize: "18px", lineHeight: "1.5" }}>
      
      {/* Bộ lọc theo chất liệu */}
      <div style={{ display: "inline-block", marginRight: "60px" }}>
        <label> Chọn chất liệu: </label>
        <select value={selectedMaterial} onChange={(e) => setSelectedMaterial(e.target.value)}>
          <option value="Tất cả">Tất cả</option>
          <option value="Vàng">Vàng</option>
          <option value="Bạc">Bạc</option>
          <option value="Kim cương">Kim cương</option>
        </select>
      </div>
      
      {/* Bộ lọc theo giá */}
      {/* Dropdown chọn khoảng giá */}
      <div style={{ display: "inline-block" }}>
        <label> Khoảng giá: </label>
        <select onChange={(e) => {
          const [min, max] = e.target.value.split("-").map(Number);
          setPriceRange([min, max]);
        }}>
          <option value="0-2000">Tất cả</option>
          <option value="0-500">0 - 500K</option>
          <option value="500-1000">500K - 1 triệu</option>
          <option value="1000-2000">1 triệu - 2 triệu</option>
        </select>
      </div>
      <p>Khoảng giá hiện tại: {priceRange[0]}K - {priceRange[1]}K</p>

    </div>
  );
};

export default ProductFilter;
