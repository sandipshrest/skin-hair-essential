import React, { useEffect, useState } from "react";
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
import BannerData from "../../../../data/BannerData";
import api from "../../../../api/axios";

const Banner = () => {
  const [bannerList, setBannerList] = useState([]);

  // handle fetch banner list
  const fetchBannerList = async () => {
    try {
      const response = await api.get("/banner");
      if (response.status === 200) {
        setBannerList(response.data.banners);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBannerList();
  }, []);

  return (
    <section className="w-full h-auto bg-gradient-to-tr from-green-100 to-blue-100">
      <Swiper
        modules={[Pagination, Scrollbar, A11y, Autoplay, EffectFade]}
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        style={{
          "--swiper-pagination-bullet-size": "8px",
          "--swiper-pagination-bullet-inactive-color": "#fff",
          "--swiper-theme-color": "green",
          "--swiper-pagination-bullet-inactive-opacity": "0.7",
          "--swiper-navigation-size": "30px",
          "--swiper-navigation-background": "#000",
        }}
        pagination={{
          clickable: true,
        }}
        autoplay={{ delay: 6000 }}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        speed={4000}
      >
        {bannerList?.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="container h-full w-full flex justify-between items-center inset-0">
              <div className="xl:w-1/2 md:w-2/3 w-full flex flex-col items-start gap-5">
                <h1 className="lg:text-6xl md:text-5xl sm:text-4xl text-3xl font-semibold">
                  <span className="mr-1 text-color2">
                    {item.title.split(" ").slice(0, 2).join(" ")}
                  </span>
                  {item.title.split(" ").slice(2).join(" ")}
                </h1>
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium sm:text-base text-sm text-white border border-green-600 hover:border-white bg-green-600 hover:bg-white hover:bg-opacity-10 px-2 py-1 cursor-pointer transition-all duration-200 ease-linear"
                >
                  Shop Now
                </a>
              </div>
              <div>
                <img
                  src={item.bannerImage}
                  className="w-full lg:h-[850px] md:h-[600px] sm:h-[500px] h-[350px] object-cover"
                  alt="banner-image"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;
