import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import normalContext from "../context/normalContext";

import SearchBar from "./SearchBar";

const MainRoute = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    setLoading,
    getItems,
    getCartItems,
  } = useContext(normalContext);

  useEffect(() => {
    const checkUser = () => {
      let user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setIsAuthenticated(true);
        getItems(user.user.token);
        getCartItems(user.user.token);
        setLoading(false);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkUser();
  }, [isAuthenticated, setIsAuthenticated, setLoading, getItems, getCartItems]);

  return (
    <>
      <SearchBar />
      <Outlet />
    </>
  );
};

export default MainRoute;
