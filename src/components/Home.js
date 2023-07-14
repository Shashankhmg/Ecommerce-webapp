import React from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MyCarousel from "./carousel";
import ShopByCategory from "./ShopByCategory";
import BuyProductPage from "./BuyProductPage";

const Home = () => {
  return (
    <React.Fragment>
      <MyCarousel />
      <ShopByCategory />
      <h1 className="heading text-center text-uppercase p-3 display-5 font-weight-bold">
        Shop <span style={{ color: "green" }}>Products</span>
      </h1>
      <BuyProductPage />
    </React.Fragment>
  );
};

export default Home;
