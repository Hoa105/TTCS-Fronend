// import { createContext, useState, useEffect } from "react";

// export const ProductContext = createContext();

// export const ProductProvider = ({ children }) => {
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState(() => {
//     return JSON.parse(localStorage.getItem("cart")) || [];
//   });

//   const [selectedCategory, setSelectedCategory] = useState("Tất cả");
//   const [selectedMaterial, setSelectedMaterial] = useState("Tất cả");
//   const [priceRange, setPriceRange] = useState([0, 2000]);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     fetch("http://localhost:8081/products")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log(data);
//         const formattedProducts = data.map((item) => ({
//           id: item.id,
//           name: item.name,
//           price: item.price,
//           category: item.category,
//           image: item.image,
//         }));

//         setProducts(formattedProducts);
//       })
//       .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error));
//   }, []);

//   // ✅ Lưu giỏ hàng vào localStorage mỗi khi `cart` thay đổi
//   useEffect(() => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//   }, [cart]);

//   // ✅ Hàm thêm vào giỏ hàng (có kiểm tra sản phẩm đã tồn tại)
//   const addToCart = (product) => {
//     setCart((prevCart) => {
//       const existingProduct = prevCart.find((item) => item.id === product.id);
//       if (existingProduct) {
//         return prevCart.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prevCart, { ...product, quantity: 1 }];
//       }
//     });
//   };

//   return (
//     <ProductContext.Provider
//       value={{
//         products,
//         addToCart,
//         cart,
//         setCart,
//         selectedCategory,
//         setSelectedCategory,
//         selectedMaterial,
//         setSelectedMaterial,
//         priceRange,
//         setPriceRange,
//         searchQuery,
//         setSearchQuery,
//       }}
//     >
//       {children}
//     </ProductContext.Provider>
//   );
// };
