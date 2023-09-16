import React from "react";
import LoadingBar from "../utils/images/1488.png";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <img src={LoadingBar} className="h-[10rem] w-[10rem]" alt="loadingbar" />;
    </div>
  );
};

export default Loader;
