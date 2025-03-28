import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const Filter = () => {
  const { filters, setFilters } = useContext(ProductContext);

  return (
    <div className="filter-container">
      <label>Loại trang sức:</label>
      <select
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
      >
        <option value="Tất cả">Tất cả</option>
        <option value="Nhẫn">Nhẫn</option>
        <option value="Dây chuyền">Dây chuyền</option>
        <option value="Bông tai">Bông tai</option>
      </select>

      <label>Chất liệu:</label>
      <select
        value={filters.material}
        onChange={(e) => setFilters({ ...filters, material: e.target.value })}
      >
        <option value="">Tất cả chất liệu</option>
        <option value="Vàng">Vàng</option>
        <option value="Bạc">Bạc</option>
        <option value="Kim cương">Kim cương</option>
      </select>

      <label>Giá tối đa:</label>
      <input
        type="number"
        placeholder="Nhập giá tối đa"
        value={filters.price}
        onChange={(e) => setFilters({ ...filters, price: e.target.value })}
      />
    </div>
  );
};

export default Filter;
