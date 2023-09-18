import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import normalContext from "../context/normalContext";

import SearchBar from "./SearchBar";

const MainRoute = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    setLoading,
    getItems,
    getCartItems,
    data,
  } = useContext(normalContext);

  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setIsAuthenticated(true);
        if (user.user.token !== undefined) {
          getItems(user.user.token);
          getCartItems(user.user.token);
          return;
        }
        console.log(user.user.token);
        setLoading(false);
        navigate("/store");
        return;
      } else {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
    };
    checkUser();
  }, [isAuthenticated]);

  return (
    <>
      <SearchBar />
      <Outlet />
    </>
  );
};

export default MainRoute;
