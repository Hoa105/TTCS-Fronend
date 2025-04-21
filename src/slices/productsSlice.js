// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const productsFetch = createAsyncThunk(
//   "products/productsFetch",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await fetch("http://localhost:8081/products");
//       if (!response.ok) {
//         return rejectWithValue("Server Error!");
//       }
//       const data = await response.json();

//       if (!Array.isArray(data.results)) {
//         return rejectWithValue("Invalid data format");
//       }

//       return data.results;
//     } catch (error) {
//       return rejectWithValue(error.message || "Lỗi khi fetch sản phẩm");
//     }
//   }
// );

// const productsSlice = createSlice({
//   name: "products",
//   initialState: {
//     items: [],
//     status: "idle",
//     error: null,
//     cart: JSON.parse(localStorage.getItem("cart")) || [],
//     searchQuery: "",
//     selectedCategory: "Tất cả",
//     selectedMaterial: "Tất cả"
//     selectedMaterial: "Tất cả",
//     priceRange: [0, 200000],
//   },
//   reducers: {
//     addToCart: (state, action) => {
//       const product = action.payload;
//       const existingProduct = state.cart.find((item) => item.id === product.id);

//       if (existingProduct) {
//         existingProduct.quantity += 1;
//       } else {
//         state.cart.push({ ...product, quantity: 1 });
//       }

//       localStorage.setItem("cart", JSON.stringify(state.cart));
//     },
//     setCart: (state, action) => {
//       state.cart = action.payload;
//       localStorage.setItem("cart", JSON.stringify(state.cart));
//     },
//     setMaterial: (state, action) => {
//       state.selectedMaterial = action.payload;
//     },
//     setPriceRange: (state, action) => {
//       state.priceRange = action.payload;
//     },
//     setSearchQuery: (state, action) => {
//       state.searchQuery = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(productsFetch.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(productsFetch.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.items = action.payload;
//       })
//       .addCase(productsFetch.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload || "Lỗi không xác định";
//       });
//   },
// });

// export const {
//   addToCart,
//   setCart,
//   setMaterial,
//   setPriceRange,
//   setSearchQuery,
// } = productsSlice.actions;
// export default productsSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch sản phẩm từ API
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
    selectedMaterial: "Tất cả", // Chất liệu chọn
    priceRange: [0, 200000000], // Khoảng giá
  },
  reducers: {
    // Thêm sản phẩm vào giỏ hàng
    addToCart: (state, action) => {
      const product = action.payload;
      const existingProduct = state.cart.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }

      // Lưu giỏ hàng vào localStorage
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    // Cập nhật giỏ hàng
    setCart: (state, action) => {
      state.cart = action.payload;
      localStorage.setItem("cart", JSON.stringify(state.cart));
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
  addToCart,
  setCart,
  setMaterial,
  setPriceRange,
  setSearchQuery,
} = productsSlice.actions;

export default productsSlice.reducer;
