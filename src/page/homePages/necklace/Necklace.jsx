import React, { useEffect } from "react";
import "./Necklace.css";
import Header from "../header/Header";
import Navigation from "../navigation/Navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Footer from "../footer/Footer";

function Necklace() {
  useEffect(() => {
    document.title = "Dây chuyền";
  }, []);
  return (
    <div className="Necklace">
      <Header />
      <Navigation />
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[Pagination, Autoplay]}
        className="necklace"
      >
        <SwiperSlide>
          <img src="./images/necklacePage/necklace01.jpg" alt="necklace" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/necklacePage/necklace02.jpg" alt="necklace" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/necklacePage/necklace3.jpg" alt="necklace" />
        </SwiperSlide>
      </Swiper>
      <h3 className="Necklace__title">Dây chuyền chính hãng thời trang</h3>
      <Footer />
    </div>
  );
}

export default Necklace;
