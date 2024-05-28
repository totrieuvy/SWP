import React, { useEffect } from "react";
import Header from "../header/Header";
import Navigation from "../navigation/Navigation";
import "./GoldPage.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Footer from "../footer/Footer";

function GoldPage() {
  useEffect(() => {
    document.title = "Sản phẩm vàng";
  }, []);
  return (
    <div className="GoldPage">
      <Header />
      <Navigation />
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[Pagination, Autoplay]}
        className="gold"
      >
        <SwiperSlide>
          <img src="./images/goldPage/gold1.jpg" alt="gold" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/goldPage/gold2.jpg" alt="gold" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/goldPage/gold3.jpg" alt="gold" />
        </SwiperSlide>
      </Swiper>
      <h3 className="GoldPage__title">Vàng chính hãng thời trang</h3>
      <Footer />
    </div>
  );
}

export default GoldPage;
