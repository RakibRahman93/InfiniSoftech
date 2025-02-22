"use client";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/free-mode";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, FreeMode } from "swiper/modules";

const Slider = () => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={0}
      loop={true}
      freeMode={{ enabled: true,momentum: true }}
      modules={[FreeMode, Autoplay]}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
      }}
      speed={5000}
      breakpoints={{
        768: { slidesPerView: 3 }, // Show 3 slides on larger screens
      }}
      className="w-full"
    >
      <SwiperSlide>
        <img
          src="assets/images/slider/slide1.png"
          alt="Slide 1"
          className="w-full"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="assets/images/slider/slide2.png"
          alt="Slide 2"
          className="w-full"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="assets/images/slider/slide3.png"
          alt="Slide 3"
          className="w-full"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="assets/images/slider/slide4.png"
          alt="Slide 3"
          className="w-full"
        />
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
