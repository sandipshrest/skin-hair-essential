import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, A11y, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/scrollbar";

const Ad = () => {
  const adImages = [
    "/images/ad-images/img1.jpg",
    "/images/ad-images/img2.jpg",
    "/images/ad-images/img3.jpg",
    "/images/ad-images/img4.jpg",
    "/images/ad-images/img5.jpg",
    "/images/ad-images/img6.jpg",
  ];

  return (
    <section className="py-10 bg-color3 bg-opacity-10">
      <Swiper
        modules={[Scrollbar, A11y, Autoplay, Navigation]}
        spaceBetween={20}
        slidesPerView={3}
        loop={true}
        navigation={{
          clickable: true,
        }}
        style={{
          "--swiper-theme-color": "green",
          "--swiper-pagination-bullet-inactive-opacity": "0.7",
          "--swiper-navigation-size": "25px",
        }}
        autoplay={{ delay: 5000 }}
      >
        {adImages.map((image, id) => (
          <SwiperSlide key={id}>
            <div className="relative w-full h-auto">
              <img
                src={image}
                alt={`image ${1}`}
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute w-full h-full inset-0 bg-black opacity-10"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Ad;
