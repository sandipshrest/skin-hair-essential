import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import BannerData from "../../data/BannerData";

const Banner = () => {
  return (
    <section className="w-full h-auto text-white">
      <Swiper
        modules={[Pagination, Scrollbar, A11y, Autoplay, EffectFade]}
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        style={{
          "--swiper-pagination-bullet-size": "8px",
          "--swiper-pagination-bullet-inactive-color": "#fff",
          "--swiper-theme-color": "red",
          "--swiper-pagination-bullet-inactive-opacity": "0.7",
          "--swiper-navigation-size": "30px",
          "--swiper-navigation-background": "#000",
        }}
        pagination={{
          clickable: true,
        }}
        autoplay={{ delay: 5000 }}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        speed={3000}
      >
        {BannerData.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-auto">
              <img
                src={item.imageUrl}
                className="w-full lg:h-[800px] md:h-[600px] sm:h-[500px] h-[350px] object-cover"
                alt="banner-image"
              />
              <div className="absolute w-full h-full inset-0 bg-gradient-to-t from-black to-gray-400 opacity-50"></div>
            </div>
            <div className="container h-full w-full absolute flex items-center inset-0 pt-[78px]">
              <div className="xl:w-1/2 md:w-2/3 w-full flex flex-col items-start gap-3">
                <h1 className="lg:text-6xl md:text-5xl sm:text-4xl text-3xl font-semibold">
                  <span className="mr-1 text-brand1">
                    {item.slogan.split(" ")[0]}
                  </span>
                  {item.slogan.split(" ").slice(1).join(" ")}
                </h1>
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium sm:text-base text-sm text-white border border-blue-950 hover:border-white bg-blue-950 hover:bg-white hover:bg-opacity-10 px-2 py-1 cursor-pointer transition-all duration-200 ease-linear"
                >
                  Company Profile
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
