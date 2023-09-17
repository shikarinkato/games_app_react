import React, { useContext } from "react";
import normalContext from "../context/normalContext";
import Loader from "./Loader";
import Genre from "./Genre";
import { Link } from "react-router-dom";
import Stores from "./Stores";
import GameLogo from "../utils/Videos/gamelogo animation.gif";

const GamesSale = () => {
  const { data, loading, page, setPage, getgameDetails, next, previous } =
    useContext(normalContext);

  const detailHandler = (id) => {
    getgameDetails(id);
    getgameDetails(id, "screenshots");
    getgameDetails(id, "stores");
  };

  if (loading) {
    return <Loader />;
  }
  if (!data || data.length === 0) {
    return (
      <div className=" mt-[5rem] sm:mt-[10rem]  sm:mb-0 flex  flex-col items-center h-[25vh]  sm:h-[20vh]  w-screen  ">
        <div className="flex flex-col-reverse sm:flex-row  justify-center gap-x-4 items-center px-16">
          <h1 className="text-white text-2xl font-semibold">
            Currently We Are Unable To Fatch Games
          </h1>
          <img src={GameLogo} alt="gamelogo" />
        </div>
      </div>
    );
  }

  return (
    <div className="mt-[5rem] md:mt-[10rem]">
      <div className="grid lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 md:gap-y-8 ">
        {data &&
          data.map((game) => {
            const rating = game.rating;
            const fullStars = Math.floor(rating);

            const hasHalfStar = rating - fullStars >= 0.5;

            const starArray = [];
            for (let i = 0; i < fullStars; i++) {
              starArray.push("full-star");
            }
            if (hasHalfStar) {
              starArray.push("half-star");
            }
            console.log(game.id);

            return (
              <Link to="/store/gamedetails">
                <div
                  className="flex flex-col mt-8 md:mt-0 pb-8 card gap-2 md:gap-4 p-4 rounded-lg text-white bg-[#2a2a2a] w-[180px] md:min-w-[290px]"
                  key={game.id}
                  onClick={() => detailHandler(game.id)}
                >
                  <div className="relative h-[90px] w-[150px]  md:h-[190px] md:w-[250px]">
                    {game.background_image ? (
                      <img
                        src={game.background_image}
                        className=" h-[90px] w-[150px] md:h-[190px] md:w-[250px] rounded-lg"
                        alt="gameimage"
                      />
                    ) : (
                      "Loading"
                    )}
                    <span className="absolute top-1 md:top-2 left-1 md:left-4 bg-[rgb(37,99,235)] text-[12px] md:text-[14px] px-[4px] md:px-[8px] cursor-pointer rounded-full">
                      {game.released && game.released.slice(0, 4)}
                    </span>
                  </div>
                  <div className="flex flex-row gap-x-2 flex-wrap gap-y-2">
                    {<Genre genres={game.genres} />}
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <span className=" text-[12px] md:text-[16px]">
                      Rating: -
                    </span>
                    <div className="flex gap-x-2 items-center">
                      {game.rating
                        ? starArray.map((value, idx) => {
                            if (value === "full-star") {
                              return (
                                <svg
                                  key={idx}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  className="h-[15px] md:h-[20px] "
                                >
                                  <path
                                    d="M12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"
                                    fill="rgb(251 191 36)"
                                  ></path>
                                </svg>
                              );
                            } else if (value === "half-star") {
                              return (
                                <svg
                                  key={idx}
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  className=" h-[15px] md:h-[20px] "
                                >
                                  <path
                                    d="M12.0006 15.968L16.2473 18.3451L15.2988 13.5717L18.8719 10.2674L14.039 9.69434L12.0006 5.27502V15.968ZM12.0006 18.26L4.94715 22.2082L6.52248 14.2799L0.587891 8.7918L8.61493 7.84006L12.0006 0.5L15.3862 7.84006L23.4132 8.7918L17.4787 14.2799L19.054 22.2082L12.0006 18.26Z"
                                    fill="rgb(251 191 36)"
                                  ></path>
                                </svg>
                              );
                            } else {
                              return 0;
                            }
                          })
                        : "No Rating"}
                      <span
                        className={
                          game.rating
                            ? "flex  text-[12px] md:text-[14px]"
                            : "hidden"
                        }
                      >
                        {"(" + game.rating + "/ 5 )"}
                      </span>
                    </div>
                  </div>
                  <div
                    className=" text-[14px] md:text-2xl font-semibold text-white"
                    id="gamename"
                  >
                    {game.name}
                  </div>
                  <div className="flex flex-col text-[12px] md:text-[14px] gap-y-3">
                    <span>Available on :-</span>
                    {game.stores ? (
                      <Stores stores={game.stores} />
                    ) : (
                      <span>Can't Find Any Store 😓</span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
      <div className="flex justify-between w-[100%] mt-8">
        <button
          disabled={previous == null}
          className="page_btn"
          onClick={() => setPage(page - 1)}
        >
          <i className="material-symbols-outlined text-[12px] md:text-[16px] xl:text-[20px]">
            arrow_back_ios
          </i>
        </button>

        <button
          disabled={next == null}
          className="page_btn"
          onClick={() => {
            setPage(page + 1);
          }}
        >
          <i className="material-symbols-outlined  text-[12px] md:text-[16px] xl:text-[20px]">
            arrow_forward_ios
          </i>
        </button>
      </div>
      <div className="flex flex-row justify-center items-center gap-x-2">
        <span
          className={
            page <= 1 ? "hidden" : "text-[#605959] text-[10px] md:text-[14px]"
          }
        >
          {page - 1}
        </span>
        <span className="text-white font-semibold text-[12px] md:text-[16px] xl:text-[20px]">
          {page}
        </span>
        <span className="text-[#605959] text-[10px] md:text-[14px]">
          {page + 1}
        </span>
      </div>
    </div>
  );
};

export default GamesSale;
