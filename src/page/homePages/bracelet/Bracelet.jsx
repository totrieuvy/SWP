import React, { useEffect } from "react";
import "./Bracelet.css";
import Header from "../header/Header";
import Navigation from "../navigation/Navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Footer from "../footer/Footer";

function Bracelet() {
  useEffect(() => {
    document.title = "Vòng tay";
  }, []);
  return (
    <div className="Bracelet">
      <Header />
      <Navigation />
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[Pagination, Autoplay]}
        className="bracelet"
      >
        <SwiperSlide>
          <img src="./images/braceletPage/bracelet1.jpg" alt="bracelet" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/braceletPage/bracelet2.jpg" alt="bracelet" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/braceletPage/bracelet3.jpg" alt="bracelet" />
        </SwiperSlide>
      </Swiper>
      <h3 className="Bracelet__title">Vòng tay chính hãng thời trang</h3>
      <Footer />
    </div>
  );
}

export default Bracelet;
