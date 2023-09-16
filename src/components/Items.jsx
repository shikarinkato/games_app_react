import React, { useContext } from "react";
import normalContext from "../context/normalContext";
import Loader from "./Loader";

const Items = ({ items, thing, name }) => {
  const { removeItem } = useContext(normalContext);

  if (!items) {
    <Loader />;
    return;
  }
  return (
    <div className="flex justify-center mt-[5rem] gap-y-8  flex-col items-center w-[100%] h-[100%]  mb-8 md:mt-[8rem]">
      <h1 className="text-3xl font-semibold text-white">{name}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4   gap-4 px-6">
        {items &&
          items.map((i) => (
            <div className="flex flex-row gap-x-4 justify-between items-start w-[20rem] sm:w-[18rem] md:w-[20rem] text-white bg-[#605959] py-4 px-2 rounded-md">
              <div className="max-h-[60px] max-w-[60px]">
                <img
                  className="min-h-[60px] min-w-[60px] object-cover rounded-lg"
                  src={i.pic}
                  alt=""
                />
              </div>
              <h1 className=" text-[20px] lg:text-xl xl:text-2xl font-semibold">
                {i.name}
              </h1>
              <button
                className="relative bottom-3"
                onClick={() => removeItem(i._id, thing)}
              >
                <i className="material-symbols-outlined footer_icons">close</i>
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Items;
