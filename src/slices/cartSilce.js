// src/slices/cartSilce.js
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// --- Các hàm helper (getUserId, getCartStorageKey, loadCartFromStorage, saveCartToStorage) giữ nguyên ---
function getUserId() {
  const userData = localStorage.getItem("user");
  if (!userData || userData === "undefined") return null;
  try {
    const user = JSON.parse(userData);
    return user?.id || null;
  } catch (e) {
    console.error("Error parsing user from localStorage:", e);
    return null;
  }
}

const getCartStorageKey = () => {
  const userId = getUserId();
  return userId ? `cart_${userId}` : "cart_guest";
};

const loadCartFromStorage = () => {
  const key = getCartStorageKey();
  try {
    const cartData = localStorage.getItem(key);
    // Đảm bảo các item tải lên có maxQuantity nếu trước đó lưu thiếu
    const parsedCart = cartData ? JSON.parse(cartData) : [];
    return parsedCart.map((item) => ({
      ...item,
      // Thêm maxQuantity mặc định nếu thiếu (lý tưởng là luôn có)
      maxQuantity: item.maxQuantity || item.quantity || 1,
    }));
  } catch (error) {
    console.error("Error parsing cart from localStorage:", error);
    return [];
  }
};

const saveCartToStorage = (cart) => {
  try {
    const key = getCartStorageKey();
    localStorage.setItem(key, JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
};
// --- Kết thúc hàm helper ---

// Hàm tính toán tổng tiền và số lượng
const calculateTotals = (cart) => {
  let total = 0;
  let quantity = 0;
  cart.forEach((cartItem) => {
    const itemPrice = cartItem.price || 0;
    const itemQuantity = cartItem.quantity || 0;
    const itemTotal = itemPrice * itemQuantity;
    total += itemTotal;
    quantity += itemQuantity;
  });
  return { total: parseFloat(total.toFixed(2)), quantity };
};

const initialCart = loadCartFromStorage();
const initialTotals = calculateTotals(initialCart);

const initialState = {
  cart: initialCart,
  cartTotalQuantity: initialTotals.quantity,
  cartTotalAmount: initialTotals.total,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems(state, action) {
      state.cart = action.payload || [];
      const totals = calculateTotals(state.cart);
      state.cartTotalQuantity = totals.quantity;
      state.cartTotalAmount = totals.total;
      saveCartToStorage(state.cart);
    },
    // addToCart xử lý cả việc thêm mới và tăng số lượng
    addToCart(state, action) {
      // Payload là đối tượng productToAdd từ ProductDetail
      // { id, name, price, image, selectedSize, quantity: 1, maxQuantity, cartItemId }
      const newItem = action.payload;

      // Tìm item bằng cartItemId (id-size)
      const existingIndex = state.cart.findIndex(
        (item) => item.cartItemId === newItem.cartItemId
      );

      if (existingIndex >= 0) {
        // Item đã tồn tại, thử tăng số lượng
        const currentItem = state.cart[existingIndex];
        // Kiểm tra với maxQuantity (số lượng tồn kho của size này)
        if (currentItem.quantity < currentItem.maxQuantity) {
          currentItem.quantity += 1;
          toast.info(
            `Đã tăng số lượng ${currentItem.name} (Size: ${currentItem.selectedSize})`,
            {
              position: "bottom-left",
            }
          );
        } else {
          // Đã đạt giới hạn tồn kho
          toast.warn(
            `Số lượng tối đa cho ${currentItem.name} (Size: ${currentItem.selectedSize}) là ${currentItem.maxQuantity}`,
            {
              position: "bottom-left",
            }
          );
        }
      } else {
        // Item chưa tồn tại, thêm vào giỏ hàng
        // Đảm bảo item thêm vào có quantity: 1 và maxQuantity
        const itemToAdd = {
          ...newItem,
          quantity: 1, // Bắt đầu với số lượng 1
          // maxQuantity nên đã có trong newItem từ ProductDetail
          maxQuantity: newItem.maxQuantity,
        };
        // Kiểm tra lại maxQuantity có tồn tại không
        if (typeof itemToAdd.maxQuantity === "undefined") {
          console.error(
            "maxQuantity bị thiếu khi thêm sản phẩm vào giỏ:",
            itemToAdd
          );
          toast.error(
            `Lỗi: Không thể thêm ${itemToAdd.name} (Size: ${itemToAdd.selectedSize}) do thiếu thông tin tồn kho.`,
            { position: "bottom-left" }
          );
          return; // Dừng thực thi reducer này
        }

        state.cart.push(itemToAdd);
        toast.success(
          `${itemToAdd.name} (Size: ${itemToAdd.selectedSize}) đã được thêm vào giỏ`,
          {
            position: "bottom-left",
          }
        );
      }
      // Tính lại tổng và lưu
      const totals = calculateTotals(state.cart);
      state.cartTotalQuantity = totals.quantity;
      state.cartTotalAmount = totals.total;
      saveCartToStorage(state.cart);
    },
    decreaseCart(state, action) {
      // Payload là { cartItemId: '...' }
      const { cartItemId } = action.payload;
      const itemIndex = state.cart.findIndex(
        (item) => item.cartItemId === cartItemId
      );

      if (itemIndex >= 0) {
        const currentItem = state.cart[itemIndex];
        if (currentItem.quantity > 1) {
          currentItem.quantity -= 1;
          toast.info(
            `Đã giảm số lượng ${currentItem.name} (Size: ${currentItem.selectedSize})`,
            {
              position: "bottom-left",
            }
          );
        } else {
          // Số lượng là 1, xóa sản phẩm
          const removedItemName = currentItem.name;
          const removedItemSize = currentItem.selectedSize;
          state.cart = state.cart.filter(
            (item) => item.cartItemId !== cartItemId
          );
          toast.error(
            `${removedItemName} (Size: ${removedItemSize}) đã bị xóa khỏi giỏ`,
            {
              position: "bottom-left",
            }
          );
        }
        // Tính lại tổng và lưu
        const totals = calculateTotals(state.cart);
        state.cartTotalQuantity = totals.quantity;
        state.cartTotalAmount = totals.total;
        saveCartToStorage(state.cart);
      }
    },
    removeFromCart(state, action) {
      // Payload là { cartItemId: '...' }
      const { cartItemId } = action.payload;
      const initialLength = state.cart.length;
      let removedItemName = "";
      let removedItemSize = "";

      state.cart = state.cart.filter((item) => {
        if (item.cartItemId === cartItemId) {
          removedItemName = item.name;
          removedItemSize = item.selectedSize;
          return false; // Xóa item này
        }
        return true; // Giữ các item khác
      });

      if (state.cart.length < initialLength) {
        // Chỉ thông báo khi thực sự xóa
        toast.error(
          `${removedItemName} (Size: ${removedItemSize}) đã bị xóa khỏi giỏ`,
          {
            position: "bottom-left",
          }
        );
        // Tính lại tổng và lưu
        const totals = calculateTotals(state.cart);
        state.cartTotalQuantity = totals.quantity;
        state.cartTotalAmount = totals.total;
        saveCartToStorage(state.cart);
      }
    },
    getTotals(state, action) {
      const totals = calculateTotals(state.cart);
      state.cartTotalQuantity = totals.quantity;
      state.cartTotalAmount = totals.total;
    },
    clearCart(state) {
      state.cart = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
      saveCartToStorage(state.cart);
      toast.error("Giỏ hàng đã được xóa", { position: "bottom-left" });
    },
  },
});

export const {
  setCartItems,
  addToCart,
  decreaseCart,
  removeFromCart,
  getTotals,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
