import React, { useEffect } from "react";
import "./RingPage.css";
import Header from "../header/Header";
import Navigation from "../navigation/Navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Footer from "../footer/Footer";

function RingPage() {
  useEffect(() => {
    document.title = "Nhẫn";
  }, []);
  return (
    <div className="RingPage">
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
          <img src="./images/ringPage/ring01.jpg" alt="ring" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/ringPage/ring02.jpg" alt="ring" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/ringPage/ring03.jpg" alt="ring" />
        </SwiperSlide>
      </Swiper>
      <h3 className="RingPage__title">Nhẫn chính hãng thời trang</h3>
      <Footer />
    </div>
  );
}

export default RingPage;
