import React, { useEffect } from "react";
import "./Earring.css";
import Header from "../header/Header";
import Navigation from "../navigation/Navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Footer from "../footer/Footer";

function Earring() {
  useEffect(() => {
    document.title = "Bông tai";
  }, []);
  return (
    <div className="Earring">
      <Header />
      <Navigation />
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[Pagination, Autoplay]}
        className="earring"
      >
        <SwiperSlide>
          <img src="./images/earringPage/earring1.jpg" alt="earring" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/earringPage/earring2.jpg" alt="earring" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/earringPage/earring3.jpg" alt="earring" />
        </SwiperSlide>
      </Swiper>
      <h3 className="Earring__title">Bông tai chính hãng thời trang</h3>
      <Footer />
    </div>
  );
}

export default Earring;
