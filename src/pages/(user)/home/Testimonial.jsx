import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, A11y, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import TestimonialData from "../../../data/TestimonialData";

const Testimonial = () => {
  return (
    <section
      className="md:py-24 py-20 bg-blue-50"
      style={{
        backgroundImage: `url('/images/bg.png')`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "10% 80%",
      }}
    >
      <div className="container flex flex-col items-end">
        <div className="lg:w-2/3 flex flex-col items-center gap-14">
          <h2 className="sm:text-3xl text-xl font-semibold text-brand2">
            Testimonial
          </h2>
          <div className="w-full text-gray-900">
            <Swiper
              modules={[Scrollbar, A11y, Autoplay, Navigation]}
              spaceBetween={10}
              slidesPerView={1}
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
              {TestimonialData.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="sm:w-3/4 w-full mx-auto text-center flex flex-col items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="sm:w-24 w-20 sm:h-24 h-20 object-cover rounded-full"
                    />
                    <p className="leading-relaxed mt-4 sm:text-lg text-base">
                      {item.review}
                    </p>
                    <span className="inline-block h-1 w-10 rounded bg-brand2 my-4"></span>
                    <h3 className="font-semibold title-font tracking-wider sm:text-lg text-color1">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 font-medium sm:text-base text-sm">
                      {item.profession}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
