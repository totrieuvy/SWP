import React from "react";
import "./Home.css";
import Header from "../header/Header";
import AdvertiseCarousel from "../advertiseCarousel/AdvertiseCarousel";
import AboutUs from "../aboutUs/AboutUs";
import Footer from "../footer/Footer";
import Bracelet from "../bracelet/Bracelet";
import Anklet from "../anklet/Anklet";
import RingPage from "../ringPage/RingPage";
import Earring from "../earring/Earring";
import GoldPage from "../goldPage/GoldPage";

function Home() {
  return (
    <div className="Home">
      <Header />
      <AdvertiseCarousel />
      <AboutUs />
      <h1 className="Home__jewelry">
        CÁC SẢN PHẨM CỦA <span className="jewelry">JEWELRYMS</span>
      </h1>
      {/* <ShowProduct /> */}
      <Bracelet />
      <Anklet />
      <RingPage />
      <Earring />
      <GoldPage />
      <Footer />
    </div>
  );
}

export default Home;
