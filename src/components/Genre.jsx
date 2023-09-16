import React from "react";

const Genre = ({ genres }) => {

  return (
    <>
      {genres.map((genre) => (
        <span
          key={genre.id}
          className=" genre cursor-pointer px-2 md:px-3  text-[12px] md:text-[16px]   rounded-full "
        >
          {genre.name}
        </span>
      ))}
    </>
  );
};

export default Genre;
