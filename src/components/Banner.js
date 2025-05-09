// import React from "react";
// import bannerNew from "../assets/images/Bannernew.jpg";
// import bannerFavorite from "../assets/images/Bannerfavourite.jpg";
// import bannerSale from "../assets/images/Bannersale.jpg";
// import { productsFetch } from "../slices/productsSlice";

// const Banner = () => {
//   return (
//     <div>
//       <div>
//         <h1> Sản phẩm yêu thích nhất</h1>
//         <img src={bannerFavorite} alt="Banner" class="img-banner"></img>
//       </div>
//       <div>
//         <h1>Bộ Sưu Tập Trang Sức Mới Nhất</h1>
//         <img src={bannerNew} alt="Banner" class="img-banner"></img>
//         {/* <p className="text-lg mb-6 drop-shadow-md">
//           Vẻ đẹp sang trọng và tinh tế, tỏa sáng cùng bạn.
//         </p>
//         <a
//           href="/search?category=ring"
//           className="bg-white text-gray-900 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition"
//         >
//           Khám Phá Ngay
//         </a> */}
//       </div>
//       <div>
//         <h1>Chương trình khuyến mãi</h1>
//         <img src={bannerSale} alt="Banner" class="img-banner"></img>
//       </div>
//     </div>
//   );
// };

// export default Banner;
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; // Import hooks
import bannerNew from "../assets/images/Bannernew.jpg";
import bannerFavorite from "../assets/images/Bannerfavourite.jpg";
import bannerSale from "../assets/images/Bannersale.jpg";
import { productsFetch } from "../slices/productsSlice";
import ProductList from "./ProductList"; // Import ProductList

const Banner = () => {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((state) => state.products); // Lấy items, status, error từ store

  // Fetch sản phẩm nếu chưa có hoặc trạng thái là idle
  useEffect(() => {
    if (status === "idle") {
      dispatch(productsFetch());
    }
  }, [dispatch, status]);

  // --- Lọc sản phẩm ---
  // Giả sử mỗi sản phẩm trong 'items' có các thuộc tính boolean: isFavorite, isNew, isOnSale
  // Nếu cấu trúc dữ liệu khác, bạn cần điều chỉnh logic lọc cho phù hợp.

  const favoriteProducts = items.filter((product) => product.isFavorite); // Lọc sản phẩm yêu thích
  const newProducts = items.filter((product) => product.isNew); // Lọc sản phẩm mới
  const saleProducts = items.filter((product) => product.isSale); // Lọc sản phẩm khuyến mãi

  // Hàm render danh sách sản phẩm hoặc thông báo trạng thái
  const renderProductSection = (products) => {
    if (status === "loading") {
      return <p>Đang tải sản phẩm...</p>;
    }
    if (status === "failed") {
      return <p>Lỗi tải sản phẩm: {error}</p>;
    }
    if (status === "succeeded" && products.length > 0) {
      // Giới hạn số lượng sản phẩm hiển thị nếu cần (ví dụ: chỉ hiển thị 4 sản phẩm)
      // return <ProductList products={products.slice(0, 4)} />;
      return <ProductList products={products} />;
    }
    if (status === "succeeded" && products.length === 0) {
      return <p>Không có sản phẩm phù hợp.</p>;
    }
    return null; // Trường hợp status là 'idle'
  };

  return (
    <div>
      {/* Banner Yêu thích */}
      <div>
        <h1> Sản phẩm yêu thích nhất</h1>
        <img
          src={bannerFavorite}
          alt="Banner Yêu thích"
          className="img-banner"
        ></img>
        {/* Hiển thị sản phẩm yêu thích */}
        {renderProductSection(favoriteProducts)}
      </div>

      {/* Banner Mới */}
      <div>
        <h1>Bộ Sưu Tập Trang Sức Mới Nhất</h1>
        <img src={bannerNew} alt="Banner Mới" className="img-banner"></img>
        {/* Hiển thị sản phẩm mới */}
        {renderProductSection(newProducts)}
      </div>

      {/* Banner Khuyến mãi */}
      <div>
        <h1>Chương trình khuyến mãi</h1>
        <img
          src={bannerSale}
          alt="Banner Khuyến mãi"
          className="img-banner"
        ></img>
        {/* Hiển thị sản phẩm khuyến mãi */}
        {renderProductSection(saleProducts)}
      </div>
    </div>
  );
};

export default Banner;
