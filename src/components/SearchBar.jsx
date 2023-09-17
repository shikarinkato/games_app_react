import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import normalContext from "../context/normalContext";
import toast from "react-hot-toast";

const SearchBar = () => {
  const [search, setSearch] = useState();
  const [showMenu, setShowMenu] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  window.addEventListener("scroll", () => {
    let searchcbar = document.querySelector(".searchbar");
    let navbar = document.querySelector(".navbar").offsetHeight;
    if (window.pageYOffset > navbar) {
      searchcbar.style.position = "fixed";
      searchcbar.style.top = "0";
    } else {
      searchcbar.style.position = "absolute";
      searchcbar.style.top = `${navbar}px`;
    }
  });

  const context = useContext(normalContext);
  let { setSearchTerm, wishlistItems, cartItems } = context;

  const searchHandler = () => {
    if (search === "") {
      toast.error("Please Enter Something");
      return;
    }
    setSearchTerm(search);
    setSearch("");
  };

  const slideToggler = () => {
    let box = document.querySelector(".searchbar_sub");
    let searchbar = document.querySelector(".searchbar");
    const height = searchbar.offsetHeight;
    const computedStyles = window.getComputedStyle(searchbar);
    const paddingLeft = computedStyles.paddingLeft;
    box.style.top = `${height}px`;
    box.style.left = `${paddingLeft}`;

    setShowMenu(!showMenu);
  };
  const slideCloser = () => {
    setShowMenu(false);
  };

  const searchBarOpener = () => {
    setShowSearchInput(!showSearchInput);
    setShowMenu(false); // Close the menu when opening the search input
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setShowMenu(false);
        return;
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="searchbar  z-20 fixed h-[60px] md:h-[100px] w-[100%] flex top-[55px] justify-between items-center left-0 px-[6vw]  md:px-[12vw] text-[#969f9c]  gap-x-8   py-8 md:bg-black   bg-zinc-900">
      <div className="flex items-center">
        {!showSearchInput ? (
          <div className="flex items-center">
            <i
              className="material-symbols-outlined searchbtn relative left-8 text-[16px]"
              onClick={searchBarOpener}
              onKeyDown={(key) => {
                if (key === "Enter") {
                  searchBarOpener();
                }
              }}
            >
              search
            </i>
          </div>
        ) : (
          <div className="flex items-center">
            <i
              className="material-symbols-outlined searchbtn relative left-8 text-[16px]"
              onClick={searchHandler}
              onKeyDown={(key) => {
                if (key === "Enter") {
                  searchHandler();
                }
              }}
            >
              search
            </i>
            <input
              type="text"
              className="flex outline-none w-[15rem] h-10 pl-10 rounded-full bg-[#2a2a2a] searchinput"
              placeholder="search here"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <i
              className={
                showSearchInput
                  ? " visible xl:hidden right-8 material-symbols-outlined relative "
                  : "hidden"
              }
              onClick={() => {
                setShowSearchInput(false);
              }}
            >
              close
            </i>
          </div>
        )}
      </div>
      <ul
        className={
          showSearchInput
            ? "hidden"
            : "flex gap-x-8  font-[Inter] text-[16px] justify-between"
        }
      >
        <button
          onClick={slideToggler}
          className="xl:hidden  flex items-center text-center gap-x-2"
        >
          <li className="hover:text-white ">Discover</li>
          {!showMenu ? (
            <i className="material-symbols-outlined text-[#605959]">
              expand_more
            </i>
          ) : (
            <i className="material-symbols-outlined">expand_less</i>
          )}
        </button>
        <div
          className={`searchbar_sub  ${
            showMenu !== true
              ? "hidden xl:flex justify-between mr-[35vw] items-center gap-x-4"
              : " flex flex-col  gap-y-4 absolute px-2 py-3 top-[5rem] left-0  w-[75vw] bg-zinc-900"
          }`}
        >
          <Link to="/store">
            <li onClick={slideCloser} className="hover:text-white ">
              Discover
            </li>
          </Link>
          <Link to="/browse">
            <li
              onClick={slideCloser}
              className={
                !showMenu
                  ? "hover:text-white "
                  : "hover:text-white border-t-[1px] py-2 border-[#605959]"
              }
            >
              Browse
            </li>
          </Link>
        </div>
      </ul>
      <div>
        <div
          className={
            showSearchInput
              ? "hidden"
              : "flex  gap-x-3  flex-row justify-between items-center"
          }
        >
          <Link to="store/wishlist">
            <div className="flex  flex-row justify-center items-center">
              <span
                className={
                  wishlistItems.length === 0
                    ? "hidden"
                    : "bg-[rgb(37,99,235)] text-[12px]  px-[5px] text-white text-center relative left-8 lg:left-16 bottom-[8px] rounded-2xl "
                }
              >
                {wishlistItems.length}
              </span>
              <span className=" cursor-pointer hidden lg:flex">Wishlist</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className=" visible lg:hidden h-[25px]"
              >
                <path
                  d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11.0026 16L6.75999 11.7574L8.17421 10.3431L11.0026 13.1716L16.6595 7.51472L18.0737 8.92893L11.0026 16Z"
                  fill="white"
                ></path>
              </svg>
            </div>
          </Link>
          <Link to="store/cart">
            <div className="flex  flex-row justify-center items-center">
              <span
                className={
                  cartItems.length === 0
                    ? "hidden"
                    : "bg-[rgb(37,99,235)] text-[12px]  px-[5px] text-white text-center relative left-8 lg:left-10 bottom-[8px] rounded-2xl "
                }
              >
                {cartItems.length}
              </span>
              <span className=" cursor-pointer hidden lg:flex">cart</span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className=" visible lg:hidden h-[25px]"
              >
                <path
                  d="M4.00436 6.41662L0.761719 3.17398L2.17593 1.75977L5.41857 5.00241H20.6603C21.2126 5.00241 21.6603 5.45012 21.6603 6.00241C21.6603 6.09973 21.6461 6.19653 21.6182 6.28975L19.2182 14.2898C19.0913 14.7127 18.7019 15.0024 18.2603 15.0024H6.00436V17.0024H17.0044V19.0024H5.00436C4.45207 19.0024 4.00436 18.5547 4.00436 18.0024V6.41662ZM5.50436 23.0024C4.67593 23.0024 4.00436 22.3308 4.00436 21.5024C4.00436 20.674 4.67593 20.0024 5.50436 20.0024C6.33279 20.0024 7.00436 20.674 7.00436 21.5024C7.00436 22.3308 6.33279 23.0024 5.50436 23.0024ZM17.5044 23.0024C16.6759 23.0024 16.0044 22.3308 16.0044 21.5024C16.0044 20.674 16.6759 20.0024 17.5044 20.0024C18.3328 20.0024 19.0044 20.674 19.0044 21.5024C19.0044 22.3308 18.3328 23.0024 17.5044 23.0024Z"
                  fill="white"
                ></path>
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
