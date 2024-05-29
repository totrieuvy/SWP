import React, { useEffect } from "react";
import Header from "../header/Header";
import Navigation from "../navigation/Navigation";
import "./Anklet.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import Footer from "../footer/Footer";

function Anklet() {
  useEffect(() => {
    document.title = "Lắc chân";
  }, []);
  return (
    <div className="Anklet">
      <Header />
      <Navigation />
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[Pagination, Autoplay]}
        className="anklet"
      >
        <SwiperSlide>
          <img src="./images/ankletPage/anklet1.jpg" alt="anklet3" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/ankletPage/anklet2.jpg" alt="anklet3" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="./images/ankletPage/anklet3.jpg" alt="anklet3" />
        </SwiperSlide>
      </Swiper>
      <h3 className="Anklet__title">Lắc chân chính hãng thời trang</h3>
      <Footer />
    </div>
  );
}

export default Anklet;
