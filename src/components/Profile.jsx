import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import normalContext from "../context/normalContext";
import Loader from "./Loader";
import SearchBar from "./SearchBar";
import toast from "react-hot-toast";

const Profile = () => {
  let {
    user,
    loading,
    setLoading,
    isAuthenticated,
    setIsAuthenticated,
    Update,
  } = useContext(normalContext);
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pic, setPic] = useState("");

  const clickhandler = () => {
    setLoading(true);
    try {
      localStorage.removeItem("user");
      toast.success("Logged Out Succesfully");
      setLoading(false);
      navigate("/login");
      setIsAuthenticated(false);
    } catch (error) {
      toast.error("Failed Log Out");
      navigate("/profile");
      setLoading(false);
      setIsAuthenticated(true);
    }
  };

  const postDetails = async (pics) => {
    setLoading(true);

    try {
      if (!pics) {
        setLoading(false);
        return;
      }

      if (!pics.type.startsWith("image/")) {
        toast.error("Please Upload an Image");
        setLoading(false);
        return;
      }

      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "Games-App");
      data.append("cloud_name", "shikarinkato");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/shikarinkato/image/upload`,
        { method: "post", body: data }
      );

      if (!response.ok) {
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

  const submitHandler = () => {
    if (!name || !email) {
      toast.error("All Fields Are Mandatory");
      return;
    }

    Update(name, email, pic);
    setIsUpdating(false);
    setEmail("");
    setName("");
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    } else {
      navigate("/profile");
      return;
    }
  }, [isAuthenticated, navigate]);

  if (loading) {
    return <Loader />;
  }
  if (!user || !user.user) {
    navigate("/store");
    return;
  }

  return (
    <div className="w-[100%] flex justify-center items-center  h-[100vh] ">
      <SearchBar />
      <div className="bg-[#2a2a2a] rounded-lg text-white cursor-pointer hover:shadow-lg ">
        <div className="w-[100%] relative flex  justify-between items-center px-4 pt-4">
          <h1 className="text-2xl font-semibold">Profile</h1>{" "}
          <button
            onClick={clickhandler}
            type="button"
            className={
              isUpdating
                ? "hidden"
                : "bg-[rgb(37,99,275)] px-4 py-1 md:py-2  md:px-8  rounded-md text-white "
            }
          >
            Log Out
          </button>
        </div>
        <div className="flex justify-center items-center px-8 py-4 md:px-12 md:py-8 flex-col gap-y-4">
          <div className="flex flex-col items-center justify-center gap-y-4">
            {isUpdating ? (
              <div className="flex justify-center">
                <input
                  type="file"
                  name="pic"
                  id="pic"
                  accept="image/*"
                  onChange={(e) => postDetails(e.target.files[0])}
                />
                <label htmlFor="pic">
                  <svg
                    style={{ enableBackground: "new 0 0 48 48" }}
                    version="1.1"
                    viewBox="0 0 48 48"
                  >
                    <g id="Padding__x26__Artboard" />
                    <g id="Icons">
                      <g>
                        <path
                          d="M34.74927,16.55811c0.19336,0,0.3501-0.15625,0.3501-0.34961v-1.63086h1.63037    c0.19336,0,0.3501-0.15625,0.3501-0.34961s-0.15674-0.34961-0.3501-0.34961h-1.63037v-1.63086    c0-0.19336-0.15674-0.34961-0.3501-0.34961s-0.3501,0.15625-0.3501,0.34961v1.63086H32.7688    c-0.19336,0-0.3501,0.15625-0.3501,0.34961s0.15674,0.34961,0.3501,0.34961h1.63037v1.63086    C34.39917,16.40186,34.55591,16.55811,34.74927,16.55811z"
                          fill="#605959"
                        />
                        <g>
                          <path
                            d="M22.84106,31.62842c2.15283,0,3.90381-1.75195,3.90381-3.9043s-1.75098-3.9043-3.90381-3.9043     s-3.9043,1.75195-3.9043,3.9043S20.68823,31.62842,22.84106,31.62842z M22.84106,24.56689     c1.74121,0,3.15771,1.41602,3.15771,3.15723s-1.4165,3.15723-3.15771,3.15723s-3.1582-1.41602-3.1582-3.15723     S21.09985,24.56689,22.84106,24.56689z"
                            fill="#605959"
                          />
                          <path
                            d="M27.10712,26.01221c0.21362,0.53021,0.33795,1.10602,0.33795,1.71191     c0,2.53906-2.06543,4.60352-4.604,4.60352c-2.53906,0-4.60449-2.06445-4.60449-4.60352c0-0.6059,0.12439-1.1817,0.33801-1.71191     h-6.95422h-0.7002v9.07129c0,0.56152,0.45752,1.01855,1.02002,1.01855h21.79053c0.56836,0,1.03076-0.46191,1.03076-1.03027     v-9.05957h-0.7002H27.10712z"
                            fill="#605959"
                          />
                          <path
                            d="M33.74146,19.33838h-5.86719l-1.24951-2.2168c-0.1748-0.3125-0.50586-0.50586-0.86328-0.50586     h-5.84131c-0.35742,0-0.68848,0.19336-0.86279,0.50488l-1.25049,2.21777h-5.87744c-0.55664,0-1.00928,0.45215-1.00928,1.00879     v4.96582h0.7002h7.31598c0.8125-1.31042,2.25238-2.19238,3.90472-2.19238c1.65204,0,3.0918,0.88196,3.90424,2.19238h7.31598     h0.7002v-4.95508C34.76147,19.79541,34.30396,19.33838,33.74146,19.33838z"
                            fill="#605959"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                </label>
              </div>
            ) : (
              <img
                src={user && user.user.pic}
                className=" h-16 md:h-24 rounded-full object-cover w-16 md:w-24"
                alt=""
              />
            )}
          </div>
          <div className="flex flex-col gap-y-4 justify-start md:flex-row md:justify-between items-start md:items-center gap-x-8">
            <div className="flex flex-col gap-y-3">
              <label
                htmlFor=""
                className=" font-semibold text-[14px] md:text-xl"
              >
                Name: -
              </label>
              {isUpdating ? (
                <input
                  type="text"
                  className="acinput"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              ) : (
                <h1 className=" text-[16px] md:text-[20px] font-semibold profilebox">
                  {user && user.user.name}
                </h1>
              )}
            </div>
            <div className="flex flex-col gap-y-3">
              <label
                htmlFor=""
                className=" font-semibold text-[14px] md:text-xl"
              >
                Email: -
              </label>
              {isUpdating ? (
                <input
                  type="email"
                  className="acinput"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              ) : (
                <span className="text-[16px] md:text-[20px] font-semibold profilebox">
                  {user && user.user.email}
                </span>
              )}
            </div>
          </div>
          {isUpdating ? (
            <div className="flex flex-row gap-x-4">
              <button
                onClick={() => setIsUpdating(false)}
                className="bg-gray-100 py-2 px-8 rounded-md text-gray-600 mt-4"
              >
                cancel
              </button>
              <button
                onClick={() => {
                  submitHandler();
                }}
                className="bg-[rgb(37,99,275)] py-2 px-8 rounded-md text-white mt-4"
              >
                Save
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setIsUpdating(true);
                setEmail(user.user.email);
                setName(user.user.name);
              }}
              className={
                "bg-[rgb(37,99,275)] py-1 px-4 md:py-2 md:px-8 rounded-md text-white mt-4"
              }
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
