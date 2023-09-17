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
        <div className="flex flex-col gap-y-4 " style={{ maxWidth: "75vw" }}>
          <div className="flex justify-between items-center text-white">
            <span>{"Popular Genres "} </span>
          </div>
          <Swiper
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
          </Swiper>
          <div className="flex flex-row gap-x-4">
            <div className="flex flex-col gap-y-4">
              <div className="flex justify-start items-center gap-x-4 text-white">
                <span className="text-[#605959]">Show : </span>
                New Releases
                <i className="material-symbols-outlined">expand_more</i>
              </div>
              <div className="grid grid-cols-4  gap-x-4 gap-y-4">
                {arr2.map((i) => (
                  <div key={i} className="flex  flex-col  rounded-md">
                    <div className="w-[185px]">
                      <img
                        src="https://media.rawg.io/media/games/46d/46d98e6910fbc0706e2948a7cc9b10c5.jpg"
                        alt=""
                        className=" object-cover h-[240px] w-[185px] rounded-md"
                      />
                    </div>
                    <div className="flex justify-start flex-col gap-y-3 text-white">
                      <span className="text-[#605959] text-[14px]">
                        Base Game
                      </span>
                      <span>Game Name</span>
                      <div className="flex gap-x-3 items-center ">
                        <button className="p-1 bg-sky-600 rounded-lg">
                          30%
                        </button>
                        <span> rs,719</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseComponents;
