import React, { useEffect } from "react";
import "./Home.css";
import Header from "../header/Header";
import Navigation from "../navigation/Navigation";
import AdvertiseCarousel from "../advertiseCarousel/AdvertiseCarousel";
import AboutUs from "../aboutUs/AboutUs";
import DiamondProduct from "../diamondProduct/DiamondProduct";
import Footer from "../footer/Footer";
import GoldProduct from "../goldProduct/GoldProduct";
import GemstoneProduct from "../gemstoneProduct/GemstoneProduct";

function Home() {
  useEffect(() => {
    document.title = "JEWELRYMS";
  }, []);
  return (
    <div className="Home">
      <Header />
      <Navigation />
      <AdvertiseCarousel />
      <AboutUs />
      <h1 className="Home__jewelry">
        CÁC SẢN PHẨM CỦA <span className="jewelry">JEWELRYMS</span>
      </h1>
      <DiamondProduct />
      <GoldProduct />
      <GemstoneProduct />
      <Footer />
    </div>
  );
}

export default Home;
