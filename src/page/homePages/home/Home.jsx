import React from "react";
import "./Home.css";
import Header from "../header/Header";
import AdvertiseCarousel from "../advertiseCarousel/AdvertiseCarousel";
import AboutUs from "../aboutUs/AboutUs";
import Footer from "../footer/Footer";
import Necklace from "../necklace/Necklace";
import Bracelet from "../bracelet/Bracelet";
import Anklet from "../anklet/Anklet";
import Earring from "../earring/Earring";
import GoldPage from "../goldPage/GoldPage";
import RingPage from "../ringPage/RingPage";

function Home() {
  return (
    <div className="Home">
      <Header />
      <AdvertiseCarousel />
      <AboutUs />
      <h1 className="Home__jewelry">
        CÁC SẢN PHẨM CỦA <span className="jewelry">JEWELRYMS</span>
      </h1>
      <Necklace />
      <Bracelet />
      <Anklet />
      <Earring />
      <RingPage />
      <GoldPage />
      <Footer />
    </div>
  );
}

export default Home;
