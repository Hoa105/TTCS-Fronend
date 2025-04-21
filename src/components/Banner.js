import React from "react";
import bannerNew from "../assets/images/Bannernew.jpg";
import bannerFavorite from "../assets/images/Bannerfavourite.jpg";
import bannerSale from "../assets/images/Bannersale.jpg";

const Banner = () => {
  return (
    <div>
      <div>
        <h1> Sản phẩm yêu thích nhất</h1>
        <img src={bannerFavorite} alt="Banner" class="img-banner"></img>
      </div>
      <div>
        <h1>Bộ Sưu Tập Trang Sức Mới Nhất</h1>
        <img src={bannerNew} alt="Banner" class="img-banner"></img>
        {/* <p className="text-lg mb-6 drop-shadow-md">
          Vẻ đẹp sang trọng và tinh tế, tỏa sáng cùng bạn.
        </p>
        <a
          href="/search?category=ring"
          className="bg-white text-gray-900 px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition"
        >
          Khám Phá Ngay
        </a> */}
      </div>
      <div>
        <h1>Chương trình khuyến mãi</h1>
        <img src={bannerSale} alt="Banner" class="img-banner"></img>
      </div>
    </div>
  );
};

export default Banner;
