import React, { useContext, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import normalContext from "./context/normalContext";
import Footer from "./components/Footer";
import StoreComponents from "./components/StoreComponents";
import BrowseComponents from "./components/BrowseComponents";
import MainRoute from "./components/MainRoute";
import ErrorPage from "./components/ErrorPage";
import GameDetails from "./components/GameDetails";
import Items from "./components/Items";
const App = () => {
  const context = useContext(normalContext);
  const {
    getgame,
    page,
    searchTerm,
    GetMyProfile,
    isAuthenticated,
    wishlistItems,
    cartItems,
    Register,
  } = context;
  useEffect(() => {
    if (isAuthenticated) {
      GetMyProfile();
    }

    // getgame(page, searchTerm);
  }, [isAuthenticated, page, searchTerm]);

  // let body = document.getElementsByTagName("body");
  // if (!user || !user.user) {
  //   <Loader />;
  //   return;
  // }

  return (
    <div className="flex flex-col min-h-screen min-w-max bg-zinc-900">
      <Router>
        <Navbar />
        <main className="flex justify-center gap-y-4  pb-8 items-center h-[100%] w-[100%] bg-black md:bg-zinc-900 ">
          <Routes>
            <Route path="/" element={<MainRoute />}>
              <Route index element={<Main />} />
              <Route path="store" element={<StoreComponents />} />
              <Route path="store/gamedetails" element={<GameDetails />} />
              <Route
                exact
                path="store/wishlist"
                element={
                  <Items
                    name={"Wishlist Items"}
                    items={wishlistItems}
                    thing={"wishlist"}
                  />
                }
              />
              <Route
                exact
                path="store/cart"
                element={
                  <Items name={"Cart Items"} items={cartItems} thing={"cart"} />
                }
              />
              <Route exact path="browse" element={<BrowseComponents />} />
            </Route>
            <Route exact path="/register" element={<Signup />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route element={<ErrorPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
      <Toaster />
    </div>
  );
};

export default App;
