import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const productsFetch = createAsyncThunk(
  "products/productsFetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:8081/products");
      if (!response.ok) {
        return rejectWithValue("Server Error!");
      }
      const data = await response.json();

      // Kiểm tra định dạng dữ liệu trả về
      if (!Array.isArray(data.results)) {
        return rejectWithValue("Invalid data format");
      }

      return data.results;
    } catch (error) {
      return rejectWithValue(error.message || "Lỗi khi fetch sản phẩm");
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [], // Danh sách sản phẩm
    status: "idle", // Trạng thái tải
    error: null, // Lỗi nếu có
    cart: JSON.parse(localStorage.getItem("cart")) || [], // Giỏ hàng
    searchQuery: "", // Từ khóa tìm kiếm
    selectedCategory: "Tất cả", // Danh mục chọn
    selectedFavorite: "Tất cả", // Yêu thích chọn
    selectedNew: "Tất cả", // Mới chọn
    selectedSale: "Tất cả", // Giảm giá chọn
    selectedMaterial: "Tất cả", // Chất liệu chọn
    priceRange: [0, 200000000], // Khoảng giá
  },
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSelectedFavorite: (state, action) => {
      state.selectedFavorite = action.payload;
    },
    setSelectedNew: (state, action) => {
      state.selectedNew = action.payload;
    },
    setSelectedSale: (state, action) => {
      state.selectedSale = action.payload;
    },
    // Cập nhật chất liệu lọc
    setMaterial: (state, action) => {
      state.selectedMaterial = action.payload;
    },
    // Cập nhật khoảng giá lọc
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    // Cập nhật từ khóa tìm kiếm
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productsFetch.pending, (state) => {
        if (state.status === "idle") {
          state.status = "loading";
        }
        // state.status = "loading"; // Đang tải
        // state.error = null; // Xóa lỗi khi đang tải
      })
      .addCase(productsFetch.fulfilled, (state, action) => {
        state.status = "succeeded"; // Thành công
        state.items = action.payload; // Lưu sản phẩm
      })
      .addCase(productsFetch.rejected, (state, action) => {
        state.status = "failed"; // Lỗi
        state.error = action.payload || "Lỗi không xác định"; // Hiển thị lỗi
      });
  },
});

export const {
  setSelectedCategory,
  setSelectedFavorite,
  setSelectedNew,
  setSelectedSale,
  setMaterial,
  setPriceRange,
  setSearchQuery,
} = productsSlice.actions;

export default productsSlice.reducer;
