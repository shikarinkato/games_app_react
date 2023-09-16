import React from "react";
import Logo from "../utils/images/logo.png";

const Footer = () => {
  const scrolltoTop = () => {
    let top = document.querySelector(".navbar");
    top.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className={" bg-[#2a2a2a] py-4 px-4 md:py-8 md:px-16 text-white "}>
      <div className="flex flex-wrap justify-between items-center ">
        <div className="flex justify-between items-center gap-x-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className=" h-[20px] md:h-[30px] lg:h-[40px] footer_icons"
          >
            <path
              d="M12.001 2C6.47813 2 2.00098 6.47715 2.00098 12C2.00098 16.9913 5.65783 21.1283 10.4385 21.8785V14.8906H7.89941V12H10.4385V9.79688C10.4385 7.29063 11.9314 5.90625 14.2156 5.90625C15.3097 5.90625 16.4541 6.10156 16.4541 6.10156V8.5625H15.1931C13.9509 8.5625 13.5635 9.33334 13.5635 10.1242V12H16.3369L15.8936 14.8906H13.5635V21.8785C18.3441 21.1283 22.001 16.9913 22.001 12C22.001 6.47715 17.5238 2 12.001 2Z"
              fill="white"
            ></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-[20px] md:h-[30px] lg:h-[40px]footer_icons"
          >
            <path
              d="M12.2439 4C12.778 4.00294 14.1143 4.01586 15.5341 4.07273L16.0375 4.09468C17.467 4.16236 18.8953 4.27798 19.6037 4.4755C20.5486 4.74095 21.2913 5.5155 21.5423 6.49732C21.942 8.05641 21.992 11.0994 21.9982 11.8358L21.9991 11.9884L21.9991 11.9991C21.9991 11.9991 21.9991 12.0028 21.9991 12.0099L21.9982 12.1625C21.992 12.8989 21.942 15.9419 21.5423 17.501C21.2878 18.4864 20.5451 19.261 19.6037 19.5228C18.8953 19.7203 17.467 19.8359 16.0375 19.9036L15.5341 19.9255C14.1143 19.9824 12.778 19.9953 12.2439 19.9983L12.0095 19.9991L11.9991 19.9991C11.9991 19.9991 11.9956 19.9991 11.9887 19.9991L11.7545 19.9983C10.6241 19.9921 5.89772 19.941 4.39451 19.5228C3.4496 19.2573 2.70692 18.4828 2.45587 17.501C2.0562 15.9419 2.00624 12.8989 2 12.1625V11.8358C2.00624 11.0994 2.0562 8.05641 2.45587 6.49732C2.7104 5.51186 3.45308 4.73732 4.39451 4.4755C5.89772 4.05723 10.6241 4.00622 11.7545 4H12.2439ZM9.99911 8.49914V15.4991L15.9991 11.9991L9.99911 8.49914Z"
              fill="white"
            ></path>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="h-[20px] md:h-[30px] lg:h-[40px] footer_icons"
          >
            <path
              d="M22.2125 5.65605C21.4491 5.99375 20.6395 6.21555 19.8106 6.31411C20.6839 5.79132 21.3374 4.9689 21.6493 4.00005C20.8287 4.48761 19.9305 4.83077 18.9938 5.01461C18.2031 4.17106 17.098 3.69303 15.9418 3.69434C13.6326 3.69434 11.7597 5.56661 11.7597 7.87683C11.7597 8.20458 11.7973 8.52242 11.8676 8.82909C8.39047 8.65404 5.31007 6.99005 3.24678 4.45941C2.87529 5.09767 2.68005 5.82318 2.68104 6.56167C2.68104 8.01259 3.4196 9.29324 4.54149 10.043C3.87737 10.022 3.22788 9.84264 2.64718 9.51973C2.64654 9.5373 2.64654 9.55487 2.64654 9.57148C2.64654 11.5984 4.08819 13.2892 6.00199 13.6731C5.6428 13.7703 5.27232 13.8194 4.90022 13.8191C4.62997 13.8191 4.36771 13.7942 4.11279 13.7453C4.64531 15.4065 6.18886 16.6159 8.0196 16.6491C6.53813 17.8118 4.70869 18.4426 2.82543 18.4399C2.49212 18.4402 2.15909 18.4205 1.82812 18.3811C3.74004 19.6102 5.96552 20.2625 8.23842 20.2601C15.9316 20.2601 20.138 13.8875 20.138 8.36111C20.138 8.1803 20.1336 7.99886 20.1256 7.81997C20.9443 7.22845 21.651 6.49567 22.2125 5.65605Z"
              fill="white"
            ></path>
          </svg>
        </div>
        <button
          onClick={scrolltoTop}
          className=" text-white px-1 rounded-sm border-solid border-2 footer_btn "
        >
          <i className="material-symbols-outlined text-[2rem]">expand_less</i>
        </button>
      </div>
      <div className=" mt-8">
        <h1 className="text-gray-500 font-semibold">Resources</h1>
        <div className="flex flex-col gap-y-2 md:flex-row flex-wrap mt-3 gap-x-4">
          <div className="flex flex-col gap-y-2 text-[12px] md:text-[16px]">
            <span className="footer_icons">Support-A-Creator</span>
            <span className="footer_icons">Distibute On Epic Games</span>
            <span className="footer_icons">Careers</span>
            <span className="footer_icons">Company</span>
          </div>
          <div className="flex flex-col gap-y-2 text-[12px] md:text-[16px]">
            <span className="footer_icons">Fan Art Policy</span>
            <span className="footer_icons">UX Research</span>
            <span className="footer_icons">Store EULA</span>
          </div>
          <div className="flex flex-col gap-y-2 text-[12px] md:text-[16px]">
            <span className="footer_icons">Online Services</span>
            <span className="footer_icons">Community Rules</span>
            <span className="footer_icons">Epic Newsroom</span>
          </div>
        </div>
      </div>
      <div className="mt-8 ">
        <h1 className="text-gray-500 font-semibold">Made By Epic Games</h1>
        <div className="flex flex-col gap-y-3 md:flex-row mt-3 gap-x-4">
          <div className="flex flex-col gap-y-2 text-[12px] md:text-[16px] ">
            <span className="footer_icons">Battle Breakers</span>
            <span className="footer_icons">Fortnite</span>
            <span className="footer_icons">Infinity Blades</span>
          </div>
          <div className="flex flex-col gap-y-2 text-[12px] md:text-[16px]">
            <span className="footer_icons">Robo Recall </span>
            <span className="footer_icons">Shadow Complex</span>
            <span className="footer_icons">Unreal Tournament</span>
          </div>
        </div>
      </div>
      <div className="pt-8 pb-4" style={{ border: "0.5px solid #2a2a2a" }}>
        <p className=" w-[50vw] text-[12px] md:text-[16px] lg:text-[20px]">
          © 2023, Fake Games, Inc. All rights reserved. Fake, Fake Games, the
          Fake Games logo, Fortnite, the Fortnite logo, Unreal, Unreal Engine,
          the Unreal Engine logo, Unreal Tournament, and the Unreal Tournament
          logo are not trademarks or registered trademarks of Fake Games.It's
          Dummy Website Made Just for fun.But we'll try to provide you the best
          user experience.
        </p>
      </div>
      <div className="flex gap-y-4 justify-center flex-col md:flex-row md:justify-between items-center my-6">
        <div className="flex flex-col gap-y-2 text-center md:flex-row flex-wrap md:gap-x-3 text-[12px]">
          <span className="footer_icons">Terms Of service</span>
          <span className="footer_icons">Price of Policy</span>
          <span className="footer_icons">Store Refund Policy</span>
        </div>
        <div className="flex justify-between gap-x-3 items-center">
          <img src={Logo} className="h-[40px]" alt="" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="40"
            height="40"
            viewBox="0 0 50 50"
            className="footer_icons"
          >
            <path
              d="M 25 2 C 12.308594 2 2 12.308594 2 25 C 2 37.691406 12.308594 48 25 48 C 37.691406 48 48 37.691406 48 25 C 48 12.308594 37.691406 2 25 2 Z M 25 4 C 36.609375 4 46 13.390625 46 25 C 46 36.609375 36.609375 46 25 46 C 13.390625 46 4 36.609375 4 25 C 4 13.390625 13.390625 4 25 4 Z M 23.621094 10.5 C 15.773438 12.367188 6.65625 21.90625 7.542969 29.125 C 11.8125 21.59375 14.703125 20.570313 15.488281 20.570313 C 16.277344 20.570313 16.703125 20.996094 16.703125 21.90625 L 16.703125 33.128906 C 16.703125 34.523438 15.355469 34.355469 14.460938 34.21875 C 17.773438 39.160156 25.5 39.5 25.5 39.5 L 28.960938 35.738281 L 32.296875 38.589844 C 37.378906 35.300781 40.734375 29.726563 40.734375 28.882813 C 38.21875 31.65625 36.058594 32.160156 35.574219 32.160156 C 35.089844 32.160156 34.300781 32.101563 34.300781 31.433594 L 34.300781 18.121094 C 34.300781 16.964844 37.480469 13.171875 38.484375 11.894531 C 31.871094 13.628906 29.324219 16.933594 29.324219 16.933594 C 29.324219 16.933594 28.433594 16.265625 26.472656 16.265625 C 27.207031 16.890625 28.234375 18.023438 28.234375 19.359375 L 28.234375 31.550781 C 28.234375 31.550781 26.046875 33.128906 24.773438 33.128906 C 23.5 33.128906 22.589844 32.585938 22.589844 31.613281 L 22.589844 17.050781 C 22.589844 17.050781 20.769531 18.328125 20.769531 14.5625 C 20.769531 12.683594 23.621094 10.5 23.621094 10.5 Z"
              fill="white"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Footer;
