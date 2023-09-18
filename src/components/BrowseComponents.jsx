import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/swiper-bundle.css";

const BrowseComponents = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  const arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
  // const shiftRight = () => {
  //   const wrapper = document.querySelector(".genrewrapper");
  //   const width = wrapper.offsetWidth;
  //   wrapper.scrollLeft += width;
  //   setRefresh(!refresh);
  // };

  // const clickhandler = () => {
  //   console.log(JSON.parse(localStorage.getItem("user")));
  // };

  // const shiftLeft = () => {
  //   const wrapper = document.querySelector(".genrewrapper");
  //   const width = wrapper.offsetWidth;
  //   wrapper.scrollLeft -= width;
  //   setRefresh(!refresh);
  // };

  return (
    <div className="flex flex-col ">
      <div className="flex flex-col mt-28 gap-y-8">
        <div
          className="flex flex-col gap-y-4 h-[20vh] sm:h-[12vh] "
          style={{ maxWidth: "75vw" }}
        >
          {/* <div className="flex justify-between items-center text-white">
            <span>{"Popular Genres "} </span>
          </div> */}
          {/* <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={3}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
          >
            {arr.map((i) => (
              <SwiperSlide key={i}>
                <div key={i} className="swiper-card">
                  <div className="w-[225px]">
                    <img
                      src="https://media.rawg.io/media/games/46d/46d98e6910fbc0706e2948a7cc9b10c5.jpg"
                      alt=""
                      className=" object-cover h-[140px] w-[225px] rounded-md"
                    />
                  </div>
                  <span className="text-white text-xl">Action Games</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper> */}
          <div className="h-[2rem]  text-white">
            <h1 className="text-2xl">
              Curerntly We have Nothing on This Page To Show You
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseComponents;
