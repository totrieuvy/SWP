import React from "react";
import "./Home.css";
import Header from "../header/Header";
import AdvertiseCarousel from "../advertiseCarousel/AdvertiseCarousel";
import AboutUs from "../aboutUs/AboutUs";
import Footer from "../footer/Footer";
import ShowProduct from "../showProduct/ShowProduct";

function Home() {
  return (
    <div className="Home">
      <Header />
      <AdvertiseCarousel />
      <AboutUs />
      <h1 className="Home__jewelry">
        CÁC SẢN PHẨM CỦA <span className="jewelry">JEWELRYMS</span>
      </h1>
      <ShowProduct />
      <Footer />
    </div>
  );
}

export default Home;
