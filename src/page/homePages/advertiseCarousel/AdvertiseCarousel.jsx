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
          <img src="https://cdn.pnj.io/images/promo/208/v1-tabsale-t5-24-chung-1972x640CTA.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://cdn.pnj.io/images/promo/196/egift-t12-23-1972x640CTA.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://cdn.pnj.io/images/promo/199/pnjfast-t1-24-1972x640CTA.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-6/441488937_862531529244762_4408987029038676124_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Dnwt6MlEr4QQ7kNvgEOhMAR&_nc_ht=scontent.fsgn5-5.fna&oh=00_AYCCkvgCrbV8IugEyVHNdJ-BrpzgZAZZBfRi_8LTjsmMRw&oe=66569B13"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/442407764_862531612578087_2153590413017365685_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=ZLcBMqZDIYYQ7kNvgGUvafI&_nc_ht=scontent.fsgn5-9.fna&oh=00_AYAgbYOcP6G7lKt9Jnw1z7MiF7GjHDWZ2DFTR7Ud-YWHcQ&oe=6656981B"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
