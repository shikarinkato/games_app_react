import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <section className="error_page text-white">
      <div className="flex justify-center gap-y-4 items-center  flex-col w-[30vw]">
        <div className="flex justify-center items-center gap-x-8 w-[75%]">
          <h1 className=" text-[5rem] font-bold border-r-2 pr-4 border-white">
            404
          </h1>
          <h2 className="text-3xl font-bold ">PAGE NOT FOUND</h2>
        </div>
        <p className="text-xl">
          The page you were looking for was not found. Please verify the
          link/URL or try starting back at our store page.
        </p>
        <button
          className="bg-[rgb(37,99,235)] py-3 px-10"
          onClick={() => {
            navigate("/store");
          }}
        >
          Store
        </button>
      </div>
    </section>
  );
};

export default ErrorPage;
