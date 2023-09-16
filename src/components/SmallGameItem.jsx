import React, { useContext } from "react";
import Loader from "./Loader";
import normalContext from "../context/normalContext";

const SmallGameItem = ({ data }) => {

  if (!data) {
    return <Loader />;
  } else {
    return (
      <div className="flex flex-row ml-8 p-4 rounded-xl gap-x-4 hover:bg-[#2a2a2a]">
        <div className="h-[55px] w-[40px]">
          <img
            className=" object-cover h-[100%] w-[100%] rounded-xl"
            src={data.background_image}
            alt=""
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <h1>{data.name}</h1>
          <h1>Rockstar Games</h1>
        </div>
      </div>
    );
  }
};

export default SmallGameItem;
