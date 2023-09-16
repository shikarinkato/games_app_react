import React, { useContext, useEffect, useState } from "react";
import normalContext from "../context/normalContext";
import Addaccount from "../utils/images/signup.png";
import Logo from "../utils/images/logo.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { isAuthenticated } = useContext(normalContext);
  const [showMenu, setShowMenu] = useState(false);

  const slideOpener = () => {
    setShowMenu(true);
  };
  const slideCloser = () => {
    setShowMenu(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowMenu(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className="w-[100%]">
      <nav
        className={
          "navbar flex justify-between items-center  overflow-hidden bg-[#2a2a2a] h-[55px] "
        }
      >
        <div className="flex gap-x-2 pl-2 items-center">
          <Link to="/store">
            <img src={Logo} className=" px-2  h-[40px]" alt="logo" />
          </Link>
          {showMenu ? (
            <button
              onClick={slideCloser}
              className="md:hidden z-40 bg-[rgb(37,99,235)] absolute py-2 px-3 rounded-sm right-0 top-0  "
            >
              <i className="  material-symbols-outlined text-white text-[2rem]">
                close
              </i>
            </button>
          ) : (
            <button
              onClick={slideOpener}
              className=" md:hidden z-40 absolute bg-[rgb(37,99,235)] py-2 px-3 rounded-sm right-0 top-0 "
            >
              <i className=" material-symbols-outlined text-white text-[2rem]">
                menu
              </i>
            </button>
          )}
          <ul
            className={
              showMenu !== true
                ? "hidden md:flex md:justify-between md:items-center md:gap-x-4 h-[100%]"
                : " md:hidden flex flex-col gap-y-4 border-t-[#605959] border-t-[1px] min-w-[90vw] pl-4 z-30 absolute top-[55px] right-0 bg-[#2a2a2a]"
            }
          >
            <Link to="store">
              <li
                onClick={slideCloser}
                className=" nav_item text-[10px] cursor-pointer py-[20px] text-[#c8c8c8] hover:text-white"
              >
                STORE
              </li>
            </Link>
            <Link>
              <li
                onClick={slideCloser}
                className=" nav_item text-[10px] cursor-pointer py-[20px] text-[#c8c8c8] hover:text-white"
              >
                DISTRIBUTION
              </li>
            </Link>
            <Link>
              <li
                onClick={slideCloser}
                className=" nav_item text-[10px] cursor-pointer py-[20px] text-[#c8c8c8] hover:text-white"
              >
                SUPPORT
              </li>
            </Link>
            <Link>
              <li
                onClick={slideCloser}
                className=" nav_item text-[10px] cursor-pointer py-[20px] text-[#c8c8c8] hover:text-white"
              >
                UNREAL ENGINE
              </li>
            </Link>
          </ul>
        </div>
        <ul
          className={
            showMenu !== true
              ? "hidden md:flex md:justify-between md:items-center md:gap-x-4 h-[100%]"
              : " md:hidden flex flex-col gap-y-4 border-t-[#605959] pb-4 border-t-[1px] min-w-[90vw] pl-4 z-30 absolute top-[20rem] right-0 bg-[#2a2a2a]"
          }
        >
          <div
            className={
              showMenu !== true
                ? "flex justify-between items-center gap-x-4"
                : " flex justify-around items-center"
            }
          >
            <i
              onClick={slideCloser}
              className="  material-symbols-outlined text-[#c8c8c8] py-[16px] hover:text-white font-[100]"
            >
              language
            </i>
            <Link to="/profile">
              {isAuthenticated ? (
                <div
                  className={
                    showMenu !== true
                      ? "flex justify-between items-center  gap-x-3  h-[100%] "
                      : "flex justify-center items-center gap-x-6 "
                  }
                  onClick={slideCloser}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="h-[20px]"
                  >
                    <path
                      fill="white"
                      d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM6.02332 15.4163C7.49083 17.6069 9.69511 19 12.1597 19C14.6243 19 16.8286 17.6069 18.2961 15.4163C16.6885 13.9172 14.5312 13 12.1597 13C9.78821 13 7.63095 13.9172 6.02332 15.4163ZM12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z"
                    ></path>
                  </svg>
                  <li className="  text-[#c8c8c8] py-[20px] hover:text-white cursor-pointer text-[10px]">
                    PROFILE
                  </li>
                </div>
              ) : (
                <div
                  className={
                    showMenu !== true
                      ? "flex justify-between items-center  gap-x-3  h-[100%] "
                      : "flex justify-center items-center gap-x-6 "
                  }
                  onClick={slideCloser}
                >
                  <img src={Addaccount} alt="signup" className="   h-[20px]" />
                  <li className="  text-[#c8c8c8] py-[20px] hover:text-white cursor-pointer text-[10px]">
                    SIGN IN
                  </li>
                </div>
              )}
            </Link>
          </div>
          <li className=" px-8 text-white py-[28px] bg-[#0078f2] hover:bg-blue-600 text-center cursor-pointer text-[10px]">
            DOWNLOAD
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
