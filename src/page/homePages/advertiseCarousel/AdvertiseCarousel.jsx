// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./AdvertiseCarousel.css";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";

export default function AdvertiseCarousel() {
  return (
    <>
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[Pagination, Autoplay]}
        className="carousel"
      >
        <SwiperSlide>
          <img
            src="https://cdn.pnj.io/images/promo/208/v1-tabsale-t5-24-chung-1972x640CTA.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://cdn.pnj.io/images/promo/196/egift-t12-23-1972x640CTA.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://cdn.pnj.io/images/promo/199/pnjfast-t1-24-1972x640CTA.jpg"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
