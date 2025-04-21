import React from "react";
import ProductFilter from "../components/ProductFilter";
import ProductList from "../components/ProductList";
import Banner from "../components/Banner";
// import JewelryFilter from "../components/JewelryFilter";

const Shop = () => {
  return (
    <div>
      <Banner />
      {/* <h1> Cửa hàng</h1> */}
      {/* <JewelryFilter />  */}
      <ProductFilter />
      <ProductList />
    </div>
  );
};

export default Shop;
