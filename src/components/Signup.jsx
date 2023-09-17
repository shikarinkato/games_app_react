import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import normalContext from "../context/normalContext";
import Logo from "../utils/images/logo.png";
import toast from "react-hot-toast";

const Signup = () => {
  const context = useContext(normalContext);
  let { Register, setLoading, isAuthenticated } = context;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [pic, setPic] = useState("");
  const [showPass, setShowPass] = useState(false);

  const passShower = () => {
    setShowPass(!showPass);
  };

  const postDetails = async (pics) => {
    setLoading(true);

    try {
      if (!pics || pics.length === 0) {
        toast.error("Please Select an Image");
        setLoading(false);
        return;
      }

      for (let i = 0; i < pics.length; i++) {
        const pic = pics[i];

        if (!pic.type.startsWith("image/")) {
          toast.error("Please Upload an Image");
          setLoading(false);
          return;
        }
      }

      const data = new FormData();
      for (let i = 0; i < pics.length; i++) {
        data.append("file", pics[i]);
      }
      data.append("upload_preset", "Games-App");
      data.append("cloud_name", "shikarinkato");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/shikarinkato/image/upload`,
        { method: "post", body: data }
      );

      if (!response.ok) {
        setLoading(false)
        throw new Error("Failed To Upload Image");
      }
      const jsonData = await response.json();
      setPic(jsonData.url.toString());
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Error in Uploading Image", error.message);
      setLoading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("All Fields Are Mandatory");
      return;
    }
    if (password !== cnfPassword) {
      toast.error("Both Passswords Should Be Same");
      return;
    }
    Register(name, email, password, pic);
  };

  if (isAuthenticated) {
    return <Navigate to="/store" />;
  }
  return (
    <div className=" w-[100%] flex justify-center items-center h-auto py-2">
      <div className="flex items-center justify-center gap-y-2 md:gap-y-4 mt-20 flex-col text-white bg-[#2a2a2a] py-6 px-4 w-[15rem] sm:w-[20rem] md:w-[25rem]">
        <img src={Logo} className=" h-[40px] sm:h-[50px] md:h-[60px]" alt="logo" />
        <h1 className=" text-[14px] md:text-xl font-semibold">Sign Up</h1>
        <div className="p-4 flex flex-col  rounded-lg w-[100%]">
          <form
            action="/login"
            method="post"
            onSubmit={submitHandler}
            className="flex flex-col gap-y-4"
          >
            <label htmlFor="" className="text-[12px]  md:text-[16px]">
              Name: -
            </label>
            <input
              className=" acinput w-[100%]"
              type="text"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="" className="text-[12px]  md:text-[16px]">
              Email: -
            </label>
            <input
              className=" acinput "
              type="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="" className="text-[12px]  md:text-[16px]">
              Password
            </label>
            <div className="flex justify-between items-center relative">
              <input
                className="acinput "
                type={showPass ? "text" : "password"}
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPass ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-[20px] absolute right-1 sm:right-4 "
                  onClick={passShower}
                >
                  <path
                    fill="white"
                    d="M1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12ZM12.0003 17C14.7617 17 17.0003 14.7614 17.0003 12C17.0003 9.23858 14.7617 7 12.0003 7C9.23884 7 7.00026 9.23858 7.00026 12C7.00026 14.7614 9.23884 17 12.0003 17ZM12.0003 15C10.3434 15 9.00026 13.6569 9.00026 12C9.00026 10.3431 10.3434 9 12.0003 9C13.6571 9 15.0003 10.3431 15.0003 12C15.0003 13.6569 13.6571 15 12.0003 15Z"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-[20px] absolute  right-1 sm:right-4 "
                  onClick={passShower}
                >
                  <path
                    fill="white"
                    d="M4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12.0003 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62282 2.81932 7.5129 4.52047 5.93457ZM14.7577 16.1718L13.2937 14.7078C12.902 14.8952 12.4634 15.0002 12.0003 15.0002C10.3434 15.0002 9.00026 13.657 9.00026 12.0002C9.00026 11.537 9.10522 11.0984 9.29263 10.7067L7.82866 9.24277C7.30514 10.0332 7.00026 10.9811 7.00026 12.0002C7.00026 14.7616 9.23884 17.0002 12.0003 17.0002C13.0193 17.0002 13.9672 16.6953 14.7577 16.1718ZM7.97446 3.76015C9.22127 3.26959 10.5793 3.00016 12.0003 3.00016C17.3924 3.00016 21.8784 6.87992 22.8189 12.0002C22.5067 13.6998 21.8038 15.2628 20.8068 16.5925L16.947 12.7327C16.9821 12.4936 17.0003 12.249 17.0003 12.0002C17.0003 9.23873 14.7617 7.00016 12.0003 7.00016C11.7514 7.00016 11.5068 7.01833 11.2677 7.05343L7.97446 3.76015Z"
                  ></path>
                </svg>
              )}
            </div>
            <label htmlFor="" className=" text-[12px]  md:text-[16px]">
              Confirm Password
            </label>
            <div className="flex justify-between items-center relative">
              <input
                className="acinput "
                type={showPass ? "text" : "password"}
                placeholder="password"
                value={cnfPassword}
                onChange={(e) => setCnfPassword(e.target.value)}
              />
              {showPass ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-[20px] absolute right-1 sm:right-4 "
                  onClick={passShower}
                >
                  <path
                    fill="white"
                    d="M1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12ZM12.0003 17C14.7617 17 17.0003 14.7614 17.0003 12C17.0003 9.23858 14.7617 7 12.0003 7C9.23884 7 7.00026 9.23858 7.00026 12C7.00026 14.7614 9.23884 17 12.0003 17ZM12.0003 15C10.3434 15 9.00026 13.6569 9.00026 12C9.00026 10.3431 10.3434 9 12.0003 9C13.6571 9 15.0003 10.3431 15.0003 12C15.0003 13.6569 13.6571 15 12.0003 15Z"
                  ></path>
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-[20px] absolute right-1 sm:right-4 "
                  onClick={passShower}
                >
                  <path
                    fill="white"
                    d="M4.52047 5.93457L1.39366 2.80777L2.80788 1.39355L22.6069 21.1925L21.1927 22.6068L17.8827 19.2968C16.1814 20.3755 14.1638 21.0002 12.0003 21.0002C6.60812 21.0002 2.12215 17.1204 1.18164 12.0002C1.61832 9.62282 2.81932 7.5129 4.52047 5.93457ZM14.7577 16.1718L13.2937 14.7078C12.902 14.8952 12.4634 15.0002 12.0003 15.0002C10.3434 15.0002 9.00026 13.657 9.00026 12.0002C9.00026 11.537 9.10522 11.0984 9.29263 10.7067L7.82866 9.24277C7.30514 10.0332 7.00026 10.9811 7.00026 12.0002C7.00026 14.7616 9.23884 17.0002 12.0003 17.0002C13.0193 17.0002 13.9672 16.6953 14.7577 16.1718ZM7.97446 3.76015C9.22127 3.26959 10.5793 3.00016 12.0003 3.00016C17.3924 3.00016 21.8784 6.87992 22.8189 12.0002C22.5067 13.6998 21.8038 15.2628 20.8068 16.5925L16.947 12.7327C16.9821 12.4936 17.0003 12.249 17.0003 12.0002C17.0003 9.23873 14.7617 7.00016 12.0003 7.00016C11.7514 7.00016 11.5068 7.01833 11.2677 7.05343L7.97446 3.76015Z"
                  ></path>
                </svg>
              )}
            </div>
            <label htmlFor="" className="text-[12px]  md:text-[16px]">
              Pic: -
            </label>
            <input
              className=" acinput "
              type="file"
              accept="image/*"
              onChange={(e) => postDetails(e.target.files)}
              multiple
            />

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className={
                  " cursor-pointer py-1 px-2 text-[12px] md:text-[18px] md:py-3 md:px-4  bg-[rgb(37,99,275)] text-white hover:shadow-lg"
                }
                disabled={email === "" || password === ""}
              >
                CONTINUE
              </button>
            </div>
          </form>
        </div>
        <div className="flex justify-center items-center   flex-col gap-y-6">
          <h1 className=" text-[10px] md:text-[14px] ">Privacy Policy</h1>
          <div className=" flex  text-white text-[10px] sm:text-[12px] md:text-[16px]">
            <span>Already have a Fake Games acoount?</span>
            <Link to="/login" className=" underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
