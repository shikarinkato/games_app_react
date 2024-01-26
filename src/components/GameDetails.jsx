import React, { useContext, useEffect, useState } from "react";
import normalContext from "../context/normalContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const GameDetails = () => {
  const {
    gameDetails,
    screenshots,
    user,
    stores,
    isAuthenticated,
    backendurl,
    setLoading,
    wishlistItems,
    getItems,
    setItemAdded,
    itemadded,
    removeItem,
    getCartItems,
  } = useContext(normalContext);
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const [gameId, setGameId] = useState("");

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const imageChanger = (img) => {
    const mainimg = document.querySelector(".gameimage");
    mainimg.firstElementChild.src = `${img}`;
  };

  const rating = gameDetails.rating;
  const fullStars = Math.floor(rating);

  const hasHalfStar = rating - fullStars >= 0.5;

  const starArray = [];
  for (let i = 0; i < fullStars; i++) {
    starArray.push("full-star");
  }
  if (hasHalfStar) {
    starArray.push("half-star");
  }

  const AddToCart = async (game_id, name, pic) => {
    setLoading(true);
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (!game_id || !name || !pic) {
      toast.error("All Fields are Mandatory");
      return;
    }
    try {
      let response = await fetch(`${backendurl}/cart`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.user.token}`,
        },
        body: JSON.stringify({ game_id, name, pic }),
      });
      getCartItems(user.user.token);

      if (response.ok) {
        toast.success("Added To Cart Successfully");
      } else {
        toast.error("Failed To Add to Wishlist");
        throw new Error();
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Some Internal Server Error");
      setLoading(false);
    }
  };

  const Additem = async (game_id, name, pic) => {
    setLoading(true);
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (!game_id || !name || !pic) {
      toast.error("All Fields are Mandatory");
      return;
    }
    try {
      let response = await fetch(`${backendurl}/wishlist`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.user.token}`,
        },
        body: JSON.stringify({ game_id, name, pic }),
      });
      getItems(user.user.token);

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);

        setItemAdded(true);
      } else {
        toast.error("Failed To Add to Wishlist");

        setItemAdded(false);
        throw new Error();
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Some Internal Server Error");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (gameDetails.length === 0) {
      navigate("/store");
      return;
    }

    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setShowAll(true);
      } else {
        setShowAll(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [
    gameDetails.id,
    gameDetails.length,
    navigate,
    setItemAdded,
    wishlistItems,
  ]);

  const item = () => {
    const isAdded = wishlistItems.some((i) => {
      if (i.game_id === gameDetails.id && i.isAdded === true) {
        setGameId(i._id);
        return true;
      }
      return false;
    });
    if (isAdded) {
      setItemAdded(true);
      return;
    } else {
      setItemAdded(false);
      return;
    }
  };
  item();

  return (
    <div className=" mt-[5rem] md:mt-[10rem]">
      <div className=" w-[80vw] sm:px-12 lg:px-16 xl:px-20 flex flex-row gap-x-8 justify-center ">
        <div className="flex flex-col gap-y-4 sm:gap-y-8 md:gap-y-12 text-white">
          <div>
            <h1 className="text-[16px] sm:text-[18px] md:text-2xl font-semibold">
              {gameDetails.name}
            </h1>
          </div>
          <div className="gameimage  cursor-pointer">
            <img
              src={
                gameDetails.background_image ? gameDetails.background_image : ""
              }
              alt={gameDetails.name}
            />
          </div>
          <div className="flex justify-center flex-row flex-wrap gap-y-4 gap-x-3">
            {screenshots.results &&
              screenshots.results.map((i) => (
                <img
                  src={i.image}
                  key={i.id}
                  onClick={() => {
                    imageChanger(i.image);
                  }}
                  className="h-[20px] sm:h-[40px] md:h-[50px] rounded-md screenshots"
                  alt="screenshots"
                />
              ))}
          </div>
          <div className="text-[12px] sm:text-[16px] w-[50vw] md:text-[20px] ">
            {gameDetails.description_raw &&
              gameDetails.description_raw.slice(0, 250)}
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-y-2 pl-3 border-l-solid border-l-2 border-l-[#2a2a2a]">
              <span className="text-[#605959]">Genres</span>
              <div className="flex gap-x-2 ">
                {gameDetails.genres &&
                  gameDetails.genres.map((i) => (
                    <span
                      key={i.id}
                      className=" text-[12px] sm:[14px] md:text-[18px] underline"
                    >
                      {i.name},
                    </span>
                  ))}
              </div>
            </div>
            <div className="flex flex-col justify-start gap-y-2 pl-3 border-l-solid border-l-2 border-l-[#2a2a2a]">
              <span className="text-[#605959]">Features</span>
              <div className="flex flex-wrap max-w-[20vw] gap-x-2">
                {gameDetails.tags &&
                  gameDetails.tags.slice(4, 12).map((i) => (
                    <span
                      key={i.id}
                      className="text-[12px] sm:[14px] md:text-[18px] underline"
                    >
                      {i.name},
                    </span>
                  ))}
              </div>
            </div>
          </div>
          <div
            className={` flex flex-col relative gap-y-6  md:gap-y-12 text-[20px]  ${
              showAll ? "show-all" : "game_desc "
            }`}
          >
            <img
              src={
                gameDetails.background_image_additional &&
                gameDetails.background_image_additional
              }
              alt={gameDetails.name}
            />
            <p className="text-[12px] sm:text-[16px] md:text-[20px]">
              {gameDetails.description_raw && gameDetails.description_raw}
            </p>
            <img src={gameDetails.background_image} alt="" />
            <div className={showAll ? "hidden" : "hidden md:blur-overlay"} />
          </div>
          <div
            className={
              showAll
                ? " hidden md:flex justify-center  min-h-[4rem] relative w-[100%]"
                : " hidden md:flex justify-center min-h-[4rem] 2xl:bottom-0 relative w-[100%]"
            }
          >
            <button
              onClick={toggleShowAll}
              className={`  ${
                showAll
                  ? " absolute  py-2 px-4  border-2 border-white md:text-[18px] btn2 "
                  : "  absolute   py-2 px-4  border-2 border-white text-[18px] btn"
              } `}
              //   style={{ top: `${btnHeight}` }}
            >
              {showAll ? "Show Less" : "Show More"}
            </button>
          </div>
        </div>
        <section className="flex flex-col gap-y-4 text-white mt-20 w-[25vw]  xl:w-[50vw]">
          <div className="flex justify-between gap-x-3 ">
            <h1 className="text-[14px] sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold">
              {gameDetails.name}
            </h1>
            <div>
              {itemadded ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-[15px] md:h-[25px] xl:h-[40px]"
                  viewBox="0 0 24 24"
                  onClick={() => {
                    removeItem(gameId, "wishlist");
                  }}
                >
                  <path
                    fill="rgb(255, 0, 76)"
                    d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-[15px] md:h-[25px] xl:h-[40px]  wishlist"
                  onClick={() => {
                    Additem(
                      gameDetails.id,
                      gameDetails.name,
                      gameDetails.background_image
                    );
                  }}
                >
                  <path
                    fill="white"
                    d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853ZM18.827 6.1701C17.3279 4.66794 14.9076 4.60701 13.337 6.01687L12.0019 7.21524L10.6661 6.01781C9.09098 4.60597 6.67506 4.66808 5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701Z"
                  ></path>
                </svg>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <span className=" text-[12px] md:text-[16px] lg:text-[20px]">
              Rating: -
            </span>
            <div className="flex gap-x-2 flex-col xl:flex-row gap-y-2 items-center">
              <div className="flex gap-x-2 items-center">
                {gameDetails.rating
                  ? starArray.map((value, idx) => {
                      if (value === "full-star") {
                        return (
                          <svg
                            key={idx}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            className="h-[10px] md:h-[15px] xl:h-[20px] "
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
                            className=" h-[10px] md:h-[15px] xl:h-[20px] "
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
              </div>
              <span
                className={
                  gameDetails.rating
                    ? "flex  text-[10px] md:text-[14px]"
                    : "hidden"
                }
              >
                {"(" + gameDetails.rating + "/ 5 )"}
              </span>
            </div>
          </div>
          <div className="flex gap-y-4 flex-col xl:flex-row gap-x-4">
            <button
              onClick={() => {
                window.open(`${gameDetails.website}`, "_blank");
              }}
              className="text-[10px] sm:text-[12px] md:text-[14px] xl:text-[18px] py-1 px-2  lg:py-2 lg:px-4 bg-[#605959] rounded-md"
            >
              Offical Site
            </button>
            <button
              onClick={() => {
                AddToCart(
                  gameDetails.id,
                  gameDetails.name,
                  gameDetails.background_image
                );
              }}
              className=" text-[10px] sm:text-[12px] md:text-[14px] xl:text-[18px] py-1 px-2 lg:py-2 lg:px-4 bg-[rgb(37,99,235)] rounded-md"
            >
              Add To Cart
            </button>
          </div>
          <div className=" flex flex-col gap-y-4">
            <span className="text-[12px] md:text-[16px] xl:text-[20px]">
              Available On:-
            </span>

            <div className="flex items-center flex-row gap-x-4 gap-y-4 flex-wrap">
              {stores &&
                stores.results.map((i) => {
                  if (i.store_id === 1) {
                    return (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 48 48"
                        className="h-[15px] w-[15px] md:w-[25px] md:h-[25px] xl:w-[40px] xl:h-[40px] store"
                        key={i.store_id}
                        onClick={() => {
                          window.open(`${i.url}`, "_blank");
                        }}
                      >
                        <path d="M17.5,27c-0.9,0-1.74,0.27-2.45,0.73l3.43,1.47c1.27,0.55,1.86,2.02,1.32,3.28C19.39,33.43,18.47,34,17.5,34 c-0.33,0-0.66-0.06-0.98-0.2l-3.44-1.47C13.47,34.41,15.3,36,17.5,36c2.48,0,4.5-2.02,4.5-4.5C22,29.02,19.98,27,17.5,27z M30,13 c-2.76,0-5,2.24-5,5s2.24,5,5,5s5-2.24,5-5S32.76,13,30,13z M30,21c-1.66,0-3-1.34-3-3c0-1.66,1.34-3,3-3s3,1.34,3,3 C33,19.66,31.66,21,30,21z M24,4C13.28,4,4.54,12.42,4.03,23.01l8.95,3.83C14.15,25.7,15.74,25,17.5,25c0.16,0,0.33,0.01,0.49,0.02 l4.07-6.1C22.02,18.62,22,18.31,22,18c0-4.41,3.59-8,8-8s8,3.59,8,8c0,4.41-3.59,8-8,8c-0.14,0-0.28-0.01-0.42-0.02l-5.65,4.62 c0.04,0.3,0.07,0.59,0.07,0.9c0,3.58-2.92,6.5-6.5,6.5S11,35.08,11,31.5v-0.06l-6.44-2.76C6.66,37.47,14.56,44,24,44 c11.05,0,20-8.95,20-20S35.05,4,24,4z"></path>
                      </svg>
                    );
                  } else if (i.store_id === 2) {
                    return (
                      <svg
                        key={i.store_id}
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 50 50"
                        className="h-[15px] w-[15px] md:w-[25px] md:h-[25px] xl:w-[40px] xl:h-[40px] store"
                        onClick={() => {
                          window.open(`${i.url}`, "_blank");
                        }}
                      >
                        <path
                          fill="white"
                          d="M19.852 7.761l-15 2.25C4.362 10.085 4 10.505 4 11v12c0 .553.448 1 1 1h15c.552 0 1-.447 1-1V8.75c0-.291-.127-.567-.348-.758C20.432 7.803 20.139 7.721 19.852 7.761zM45.652 4.242c-.22-.189-.512-.271-.801-.231l-21 3.15C23.362 7.235 23 7.655 23 8.15V23c0 .553.448 1 1 1h21c.552 0 1-.447 1-1V5C46 4.709 45.873 4.433 45.652 4.242zM20 26H5c-.552 0-1 .447-1 1v12c0 .495.362.915.852.989l15 2.25c.05.007.099.011.148.011.238 0 .47-.085.652-.242C20.873 41.817 21 41.541 21 41.25V27C21 26.447 20.552 26 20 26zM45 26H24c-.552 0-1 .447-1 1v14.85c0 .495.362.915.852.989l21 3.15C44.901 45.996 44.951 46 45 46c.238 0 .47-.085.652-.242C45.873 45.567 46 45.291 46 45V27C46 26.447 45.552 26 45 26z"
                        ></path>
                      </svg>
                    );
                  } else if (i.store_id === 3) {
                    return (
                      <svg
                        key={i.store_id}
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 50 50"
                        className="h-[15px] w-[15px] md:w-[25px] md:h-[25px] xl:w-[40px] xl:h-[40px] store"
                        onClick={() => {
                          window.open(`${i.url}`, "_blank");
                        }}
                      >
                        <path d="M 19.3125 4 C 19.011719 4 18.707031 3.988281 18.40625 4.1875 C 18.105469 4.386719 18 4.699219 18 5 L 18 41.59375 C 18 41.992188 18.289063 42.394531 18.6875 42.59375 L 26.6875 45 L 27 45 C 27.199219 45 27.394531 44.914063 27.59375 44.8125 C 27.894531 44.613281 28 44.300781 28 44 L 28 13.40625 C 28.601563 13.707031 29 14.300781 29 15 L 29 26.09375 C 29 26.394531 29.199219 26.804688 29.5 26.90625 C 29.699219 27.007813 31.199219 27.90625 34 27.90625 C 36.699219 27.90625 40 26.414063 40 19.3125 C 40 13.613281 36.8125 9.292969 31.3125 7.59375 Z M 17 26.40625 L 5.90625 30.40625 L 4.3125 31 C 1.613281 32.101563 0 33.886719 0 35.6875 C 0 39.488281 2.699219 41.6875 7.5 41.6875 C 10.101563 41.6875 13.300781 41.113281 17 39.8125 L 17 36 C 16.101563 36.300781 15.113281 36.699219 14.3125 37 C 12.710938 37.601563 11.5 37.8125 10.5 37.8125 C 9 37.8125 8.300781 37.300781 8 37 C 7.601563 36.699219 7.398438 36.3125 7.5 35.8125 C 7.601563 34.8125 8.800781 33.894531 11 33.09375 C 11.5 32.894531 14.898438 31.699219 17 31 Z M 36.5 28.90625 C 34.101563 29.007813 31.601563 29.394531 29 30.09375 L 29 34.6875 C 30.101563 34.289063 31.585938 33.800781 33.6875 33 C 38.488281 31.300781 40.492188 31.488281 41.09375 31.6875 C 42.292969 31.789063 42.800781 32.5 43 33 C 43.5 34.5 41.613281 35.1875 38.8125 36.1875 C 37.511719 36.6875 31.898438 38.6875 29 39.6875 L 29 44.3125 L 44.5 38.8125 L 45.6875 38.3125 C 47.6875 37.613281 50.199219 36.300781 50 34 C 49.898438 31.800781 47.210938 30.695313 45.3125 30.09375 C 42.511719 29.195313 39.5 28.804688 36.5 28.90625 Z"></path>
                      </svg>
                    );
                  } else if (i.store_id === 4) {
                    return (
                      <svg
                        key={i.store_id}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-[15px] w-[15px] md:w-[25px] md:h-[25px] xl:w-[40px] xl:h-[40px] store"
                        onClick={() => {
                          window.open(`${i.url}`, "_blank");
                        }}
                      >
                        <path
                          fill="white"
                          d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM8.82258 15.3427C8.42804 14.8663 7.9373 14.6957 7.34401 14.834L7.19355 14.875L6.60484 15.8911C6.37903 16.2863 6.5121 16.7903 6.90726 17.0161C7.26949 17.2231 7.7232 17.1286 7.97023 16.807L8.03226 16.7137L8.82258 15.3427ZM13.2097 8.66129C12.7218 9.06452 12.2298 10.2581 12.9194 11.4476L15.9597 16.7137C16.1895 17.1089 16.6895 17.2419 17.0847 17.0161C17.4469 16.8054 17.5889 16.3677 17.4361 15.9919L17.3871 15.8911L16.5847 14.5H17.7742C18.2298 14.5 18.5968 14.1331 18.5968 13.6774C18.5968 13.2568 18.2841 12.9118 17.8776 12.8612L17.7742 12.8548H15.6331L13.44 9.05741L13.2097 8.66129ZM13.4879 5.61694C13.1257 5.40995 12.672 5.50451 12.4249 5.82608L12.3629 5.91935L11.996 6.55242L11.6371 5.91935C11.4073 5.52419 10.9073 5.39113 10.5121 5.61694C10.1499 5.82762 10.0079 6.26532 10.1606 6.64118L10.2097 6.74194L11.0484 8.19758L8.3629 12.8508H6.26613C5.81048 12.8508 5.44355 13.2177 5.44355 13.6734C5.44355 14.094 5.7562 14.439 6.16268 14.4896L6.26613 14.496H13.746C14.0869 13.8562 13.6854 12.9472 12.9357 12.8579L12.8145 12.8508H10.2621L13.7903 6.74194C14.0161 6.34677 13.8831 5.84274 13.4879 5.61694Z"
                        ></path>
                      </svg>
                    );
                  } else if (i.store_id === 5) {
                    return (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 50 50"
                        className="h-[15px] w-[15px] md:w-[25px] md:h-[25px] xl:w-[40px] xl:h-[40px] store"
                        key={i.store_id}
                        onClick={() => {
                          window.open(`${i.url}`, "_blank");
                        }}
                      >
                        <path d="M 25 2 C 12.317 2 2 12.318 2 25 C 2 37.682 12.317 48 25 48 C 37.683 48 48 37.682 48 25 C 48 12.318 37.683 2 25 2 z M 11.599609 13 L 17.400391 13 C 18.283391 13 19 13.715609 19 14.599609 L 19 24.400391 C 19 25.284391 18.284391 26 17.400391 26 L 10 26 L 10 24 L 16.400391 24 C 16.731391 24 17 23.731391 17 23.400391 L 17 15.599609 C 17 15.268609 16.731391 15 16.400391 15 L 12.599609 15 C 12.268609 15 12 15.268609 12 15.599609 L 12 19.400391 C 12 19.731391 12.268609 20 12.599609 20 L 15.5 20 L 15.5 22 L 11.599609 22 C 10.716609 22 10 21.284391 10 20.400391 L 10 14.599609 C 10 13.715609 10.715609 13 11.599609 13 z M 22.099609 13 L 27.900391 13 C 28.782391 13 29.5 13.717609 29.5 14.599609 L 29.5 20.400391 C 29.5 21.282391 28.782391 22 27.900391 22 L 22.099609 22 C 21.217609 22 20.5 21.282391 20.5 20.400391 L 20.5 14.599609 C 20.5 13.717609 21.217609 13 22.099609 13 z M 32.599609 13 L 38.400391 13 C 39.283391 13 40 13.715609 40 14.599609 L 40 24.400391 C 40 25.284391 39.284391 26 38.400391 26 L 31 26 L 31 24 L 37.400391 24 C 37.731391 24 38 23.731391 38 23.400391 L 38 15.599609 C 38 15.268609 37.731391 15 37.400391 15 L 33.599609 15 C 33.268609 15 33 15.268609 33 15.599609 L 33 19.400391 C 33 19.731391 33.268609 20 33.599609 20 L 36.5 20 L 36.5 22 L 32.599609 22 C 31.716609 22 31 21.284391 31 20.400391 L 31 14.599609 C 31 13.715609 31.715609 13 32.599609 13 z M 23.099609 15 C 22.768609 15 22.5 15.268609 22.5 15.599609 L 22.5 19.400391 C 22.5 19.731391 22.768609 20 23.099609 20 L 26.900391 20 C 27.231391 20 27.5 19.731391 27.5 19.400391 L 27.5 15.599609 C 27.5 15.268609 27.231391 15 26.900391 15 L 23.099609 15 z M 11.599609 28 L 17.5 28 L 17.5 30 L 12.599609 30 C 12.268609 30 12 30.268609 12 30.599609 L 12 34.400391 C 12 34.731391 12.268609 35 12.599609 35 L 17.5 35 L 17.5 37 L 11.599609 37 C 10.716609 37 10 36.284391 10 35.400391 L 10 29.599609 C 10 28.716609 10.715609 28 11.599609 28 z M 20.599609 28 L 26.400391 28 C 27.282391 28 28 28.717609 28 29.599609 L 28 35.400391 C 28 36.282391 27.282391 37 26.400391 37 L 20.599609 37 C 19.717609 37 19 36.282391 19 35.400391 L 19 29.599609 C 19 28.717609 19.717609 28 20.599609 28 z M 31.099609 28 L 40 28 L 40 37 L 38 37 L 38 30 L 36.349609 30 C 36.018609 30 35.75 30.268609 35.75 30.599609 L 35.75 37 L 33.75 37 L 33.75 30 L 32.099609 30 C 31.768609 30 31.5 30.268609 31.5 30.599609 L 31.5 37 L 29.5 37 L 29.5 29.599609 C 29.5 28.716609 30.215609 28 31.099609 28 z M 21.599609 30 C 21.268609 30 21 30.268609 21 30.599609 L 21 34.400391 C 21 34.731391 21.268609 35 21.599609 35 L 25.400391 35 C 25.731391 35 26 34.731391 26 34.400391 L 26 30.599609 C 26 30.268609 25.731391 30 25.400391 30 L 21.599609 30 z"></path>
                      </svg>
                    );
                  } else if (i.store_id === 6) {
                    return (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 50 50"
                        className="h-[15px] w-[15px] md:w-[25px] md:h-[25px] xl:w-[40px] xl:h-[40px] store"
                        key={i.store_id}
                        onClick={() => {
                          window.open(`${i.url}`, "_blank");
                        }}
                      >
                        <path d="M 14.529297 4 C 10.942497 4 8.2058513 5.0534259 6.4550781 7.1035156 C 4.704305 9.1536053 4 12.041439 4 15.525391 L 4 35.525391 C 4 41.557868 8.4048675 46 14.529297 46 L 24 46 L 24 4 L 14.529297 4 z M 35.474609 4 L 25.974609 4.015625 L 25.974609 46 L 35.474609 46 C 41.613609 46 46 41.565 46 35.5 L 46 15.550781 C 46 7.9587812 42.445609 4 35.474609 4 z M 14.529297 6 L 22 6 L 22 44 L 14.529297 44 C 9.323726 44 6 40.632913 6 35.525391 L 6 15.525391 C 6 12.313342 6.6623357 9.9412541 7.9765625 8.4023438 C 9.2907893 6.8634333 11.318097 6 14.529297 6 z M 14.5 10 C 13.083334 10 11.893559 10.567256 11.126953 11.429688 C 10.360347 12.292118 10 13.402778 10 14.5 C 10 15.597222 10.360347 16.707881 11.126953 17.570312 C 11.893559 18.432744 13.083334 19 14.5 19 C 15.916666 19 17.106441 18.432744 17.873047 17.570312 C 18.639653 16.707881 19 15.597222 19 14.5 C 19 13.402778 18.639653 12.292119 17.873047 11.429688 C 17.106441 10.567255 15.916666 10 14.5 10 z M 14.5 12 C 15.416666 12 15.976893 12.307744 16.376953 12.757812 C 16.777013 13.207882 17 13.847222 17 14.5 C 17 15.152778 16.777013 15.792119 16.376953 16.242188 C 15.976893 16.692256 15.416666 17 14.5 17 C 13.583334 17 13.023107 16.692256 12.623047 16.242188 C 12.222987 15.792119 12 15.152778 12 14.5 C 12 13.847222 12.222987 13.207881 12.623047 12.757812 C 13.023107 12.307745 13.583334 12 14.5 12 z M 36 24 C 38.206 24 40 25.794 40 28 C 40 30.206 38.206 32 36 32 C 33.794 32 32 30.206 32 28 C 32 25.794 33.794 24 36 24 z"></path>
                      </svg>
                    );
                  } else if (i.store_id === 7) {
                    return (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 50 50"
                        className="h-[15px] w-[15px] md:w-[25px] md:h-[25px] xl:w-[40px] xl:h-[40px] store"
                        key={i.store_id}
                        onClick={() => {
                          window.open(`${i.url}`, "_blank");
                        }}
                      >
                        <path d="M 25 2 C 20.709 2 16.618563 3.2007813 13.226562 5.3007812 C 13.007563 5.3737813 12.629156 5.6617969 12.285156 5.9667969 C 15.330156 3.5477969 22.371734 8.3929375 24.427734 9.8359375 C 24.773734 10.078938 25.228219 10.078938 25.574219 9.8359375 C 27.630219 8.3929375 34.671797 3.5467969 37.716797 5.9667969 C 37.372797 5.6617969 36.993391 5.3737813 36.775391 5.3007812 C 33.382391 3.2007813 29.291 2 25 2 z M 11 8 C 9.403 8 8.2363281 9.3007812 8.2363281 9.3007812 C 4.4443281 13.400781 2.0507812 18.9 2.0507812 25 C 2.0507812 37.7 12.328 48 25 48 C 31.685 48 37.771891 45.1 41.962891 40.5 C 41.962891 40.5 41.464094 37.499609 38.371094 33.099609 C 34.912094 27.882609 27.905109 21.311922 25.662109 19.294922 C 25.279109 18.950922 24.708125 18.952781 24.328125 19.300781 C 22.638125 20.847781 18.277406 25.177781 17.316406 26.300781 C 15.021406 28.700781 8.6353281 36.299609 8.2363281 40.599609 C 8.2363281 40.599609 6.8386406 37.200391 9.9316406 29.400391 C 11.856641 24.714391 17.835375 17.747984 20.734375 14.708984 C 21.119375 14.305984 21.110125 13.669109 20.703125 13.287109 C 19.743125 12.388109 17.505281 10.812609 15.488281 9.5996094 C 14.092281 8.6996094 12.497 8.1 11 8 z M 38.689453 8 C 38.036453 8 33.794078 9.3428281 29.330078 13.298828 C 28.908078 13.672828 28.891203 14.325469 29.283203 14.730469 C 30.900203 16.401469 35.322656 20.681391 37.972656 24.900391 C 41.265656 30.300391 43.2605 34.6 42.0625 40.5 C 45.7545 36.4 48.050781 31 48.050781 25 C 47.950781 19 45.655281 13.500391 41.863281 9.4003906 C 41.763281 9.3003906 41.663453 9.1996094 41.564453 9.0996094 C 40.766453 8.1996094 39.587453 8 38.689453 8 z"></path>
                      </svg>
                    );
                  } else if (i.store_id === 8) {
                    return (
                      <svg
                        key={i.store_id}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-[15px] w-[15px] md:w-[25px] md:h-[25px] xl:w-[40px] xl:h-[40px] store"
                        onClick={() => {
                          window.open(`${i.url}`, "_blank");
                        }}
                      >
                        <path d="M3.60972 1.81396L13.793 12L3.61082 22.1864C3.41776 22.1048 3.24866 21.962 3.13555 21.7667C3.0474 21.6144 3.00098 21.4416 3.00098 21.2656V2.73453C3.00098 2.32109 3.25188 1.96625 3.60972 1.81396ZM14.5 12.707L16.802 15.009L5.86498 21.342L14.5 12.707ZM17.699 9.50896L20.5061 11.1347C20.9841 11.4114 21.1473 12.0232 20.8705 12.5011C20.783 12.6523 20.6574 12.778 20.5061 12.8655L17.698 14.491L15.207 12L17.699 9.50896ZM5.86498 2.65796L16.803 8.98996L14.5 11.293L5.86498 2.65796Z"></path>
                      </svg>
                    );
                  } else if (i.store_id === 9) {
                    <svg
                      key={i.store_id}
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      viewBox="0 0 32 32"
                      className="h-[15px] w-[15px] md:w-[25px] md:h-[25px] xl:w-[40px] xl:h-[40px] store"
                      onClick={() => {
                        window.open(`${i.url}`, "_blank");
                      }}
                    >
                      <path
                        fill="white"
                        d="M 16 5 C 12.748 5 8.3121094 5.0508594 7.4121094 5.1308594 C 6.4021094 5.7368594 4.4028125 8.0309531 4.3828125 8.6269531 L 4.3828125 9.6269531 C 4.3828125 10.889953 5.5657188 12 6.6367188 12 C 7.9197187 12 8.9902344 10.929969 8.9902344 9.6679688 C 8.9902344 10.929969 10.0305 12 11.3125 12 C 12.6055 12 13.605469 10.930969 13.605469 9.6679688 C 13.605469 10.929969 14.695281 12 15.988281 12 L 16.009766 12 C 17.302766 12 18.392578 10.930969 18.392578 9.6679688 C 18.392578 10.929969 19.402547 12 20.685547 12 C 21.968547 12 23.009766 10.930969 23.009766 9.6679688 C 23.009766 10.929969 24.080281 12 25.363281 12 C 26.434281 12 27.615234 10.889953 27.615234 9.6269531 L 27.615234 8.6269531 C 27.595234 8.0309531 25.595938 5.7368594 24.585938 5.1308594 C 21.443938 5.0198594 19.252 5 16 5 z M 13.550781 11.742188 C 12.497781 13.552188 9.8523125 13.573906 8.8203125 11.753906 C 8.1903125 12.845906 6.7642969 13.267547 6.1542969 13.060547 C 5.9762969 14.959547 5.8534844 24.70875 7.1464844 26.34375 C 10.943484 27.22875 21.164516 27.20975 24.853516 26.34375 C 26.348516 24.81975 26.013703 14.821547 25.845703 13.060547 C 25.235703 13.267547 23.809453 12.845906 23.189453 11.753906 C 22.146453 13.573906 19.501219 13.552188 18.449219 11.742188 C 18.124219 12.332187 17.367 13.109375 16 13.109375 C 14.997 13.148375 14.051781 12.607187 13.550781 11.742188 z M 11.419922 14 C 12.219922 14 12.950078 14.000469 13.830078 14.980469 C 15.280078 14.830469 16.719922 14.830469 18.169922 14.980469 C 19.059922 14.010469 19.780078 14.009766 20.580078 14.009766 C 23.160078 14.009766 23.780937 17.819609 24.710938 21.099609 C 25.550938 24.149609 24.429062 24.230469 23.039062 24.230469 C 20.969062 24.150469 19.820313 22.650625 19.820312 21.140625 C 17.890313 21.460625 14.809688 21.580625 12.179688 21.140625 C 12.179688 22.650625 11.030938 24.150469 8.9609375 24.230469 C 7.5709375 24.230469 6.4490625 24.149609 7.2890625 21.099609 C 8.2190625 17.799609 8.8399219 14.009766 11.419922 14.009766 L 11.419922 14 z M 16 16.876953 C 16 16.876953 14.306 18.439375 14 18.984375 L 15.107422 18.943359 L 15.107422 19.910156 C 15.107422 19.968156 15.926 19.917969 16 19.917969 C 16.447 19.934969 16.892578 19.951156 16.892578 19.910156 L 16.892578 18.943359 L 18 18.984375 C 17.694 18.438375 16 16.876953 16 16.876953 z"
                      ></path>
                    </svg>;
                  } else if (i.store_id === "Playstation 5") {
                    return (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0,0,256,256"
                        style={{ fill: "#000000" }}
                        className="h-[15px] w-[15px] md:w-[25px] md:h-[25px] xl:w-[40px] xl:h-[40px] store"
                        onClick={() => {
                          window.open(`${i.url}`, "_blank");
                        }}
                        key={i.store_id}
                      >
                        <g
                          fill="#ffffff"
                          fill-rule="nonzero"
                          stroke="none"
                          stroke-width="1"
                          stroke-linecap="butt"
                          stroke-linejoin="miter"
                          stroke-miterlimit="10"
                          stroke-dasharray=""
                          stroke-dashoffset="0"
                          font-family="none"
                          font-weight="none"
                          font-size="none"
                          text-anchor="none"
                          style={{ mixBlendMode: "normal" }}
                        >
                          <g transform="scale(5.12,5.12)">
                            <path
                              fill="white"
                              d="M25.185,19.606c-1.612,0 -2.919,1.307 -2.919,2.919v4.981c0,0.911 -0.739,1.65 -1.65,1.65h-5.619v1.237h6.683c1.612,0 2.919,-1.307 2.919,-2.919v-4.981c0,-0.911 0.739,-1.65 1.65,-1.65h5.724v-1.237zM0,19.606v1.237h11.738c0.936,0 1.694,0.758 1.694,1.694c0,0.936 -0.758,1.694 -1.694,1.694h-8.819c-1.612,0 -2.919,1.307 -2.919,2.919v3.244h2.333v-3.276c0,-0.911 0.739,-1.65 1.65,-1.65h8.851c1.619,0 2.931,-1.312 2.931,-2.931c0,-1.619 -1.312,-2.931 -2.931,-2.931zM34.221,19.606v4.028c0,1.012 0.821,1.833 1.833,1.833h9.768c1.019,0 1.845,0.826 1.845,1.845c0,1.019 -0.826,1.845 -1.845,1.845h-11.601v1.237h12.697c1.702,0 3.082,-1.38 3.082,-3.082c0,-1.702 -1.38,-3.082 -3.082,-3.082h-9.628c-0.407,0 -0.737,-0.33 -0.737,-0.737v-2.651h13.023v-1.237h-15.355z"
                            ></path>
                          </g>
                        </g>
                      </svg>
                    );
                  } else if (i.store_id === 11) {
                    return (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        viewBox="0 0 50 50"
                        className="h-[15px] w-[15px] md:w-[25px] md:h-[25px] xl:w-[40px] xl:h-[40px] store"
                        key={i.store_id}
                        onClick={() => {
                          window.open(`${i.url}`, "_blank");
                        }}
                      >
                        <path d="M 10 3 C 6.69 3 4 5.69 4 9 L 4 41.240234 L 25 47.539062 L 46 41.240234 L 46 9 C 46 5.69 43.31 3 40 3 L 10 3 z M 11 8 L 15 8 L 15 11 L 11 11 L 11 18 L 14 18 L 14 21 L 11 21 L 11 28 L 15 28 L 15 31 L 11 31 C 9.34 31 8 29.66 8 28 L 8 11 C 8 9.34 9.34 8 11 8 z M 17 8 L 23 8 C 24.66 8 26 9.34 26 11 L 26 18 C 26 19.66 24.66 21 23 21 L 20 21 L 20 31 L 17 31 L 17 8 z M 28 8 L 31 8 L 31 31 L 28 31 L 28 8 z M 36 8 L 39 8 C 40.66 8 42 9.34 42 11 L 42 15 L 39 15 L 39 11 L 36 11 L 36 28 L 39 28 L 39 24 L 42 24 L 42 28 C 42 29.66 40.66 31 39 31 L 36 31 C 34.34 31 33 29.66 33 28 L 33 11 C 33 9.34 34.34 8 36 8 z M 20 11 L 20 18 L 23 18 L 23 11 L 20 11 z M 9 34 L 13 34 C 13.55 34 14 34.45 14 35 L 14 36 L 13 36 L 13 35.25 C 13 35.11 12.89 35 12.75 35 L 9.25 35 C 9.11 35 9 35.11 9 35.25 L 9 38.75 C 9 38.89 9.11 39 9.25 39 L 12.75 39 C 12.89 39 13 38.89 13 38.75 L 13 38 L 12 38 L 12 37 L 14 37 L 14 39 C 14 39.55 13.55 40 13 40 L 9 40 C 8.45 40 8 39.55 8 39 L 8 35 C 8 34.45 8.45 34 9 34 z M 18 34 L 19 34 L 22 40 L 21 40 L 20.5 39 L 16.5 39 L 16 40 L 15 40 L 18 34 z M 23 34 L 24 34 L 26 38 L 28 34 L 29 34 L 29 40 L 28 40 L 28 36 L 26.5 39 L 25.5 39 L 24 36 L 24 40 L 23 40 L 23 34 z M 30 34 L 35 34 L 35 35 L 31 35 L 31 36.5 L 33 36.5 L 33 37.5 L 31 37.5 L 31 39 L 35 39 L 35 40 L 30 40 L 30 34 z M 37 34 L 41 34 C 41.55 34 42 34.45 42 35 L 42 35.5 L 41 35.5 L 41 35.25 C 41 35.11 40.89 35 40.75 35 L 37.25 35 C 37.11 35 37 35.11 37 35.25 L 37 36.25 C 37 36.39 37.11 36.5 37.25 36.5 L 41 36.5 C 41.55 36.5 42 36.95 42 37.5 L 42 39 C 42 39.55 41.55 40 41 40 L 37 40 C 36.45 40 36 39.55 36 39 L 36 38.5 L 37 38.5 L 37 38.75 C 37 38.89 37.11 39 37.25 39 L 40.75 39 C 40.89 39 41 38.89 41 38.75 L 41 37.75 C 41 37.61 40.89 37.5 40.75 37.5 L 37 37.5 C 36.45 37.5 36 37.05 36 36.5 L 36 35 C 36 34.45 36.45 34 37 34 z M 18.5 35 L 17 38 L 20 38 L 18.5 35 z"></path>
                      </svg>
                    );
                  } else {
                    return 0;
                  }
                  return 0;
                })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default GameDetails;
