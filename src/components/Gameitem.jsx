import React, { useState } from "react";
import Genre from "./Genre";
import Stores from "./Stores";

const Gameitem = ({ game, width, height, type }) => {


  return (
    <>
      <div
        className={` gameitem   gap-y-4  flex flex-col  text-white cursor-pointer `}
        style={{ minWidth: `${width}` }}
      >
        <img
          src="https://media.rawg.io/media/games/46d/46d98e6910fbc0706e2948a7cc9b10c5.jpg"
          alt="Soory we Don't Have Image For This Game"
          className={`object-cover rounded-md`}
          style={{ height: `${height}`, width: `${width}` }}
        />
        <div className="flex flex-col gap-y-2 ">
          <span className="text-[#969f9c]">{type}</span>
          <h1 className=" font-semibold pt-2 pb-2">Unknown Game</h1>
        </div>
        <div className="flex flex-row gap-x-3">
          <button className="py-1 px-2 rounded-lg bg-blue-600">30%</button>
          <span className=" text-[#969f9c] line-through">rs 3,945</span>
          <span>rs 2,345</span>
        </div>
      </div>
    </>
  );
};

export default Gameitem;
