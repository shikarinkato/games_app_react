import React, { useState, useMemo } from "react";
import Context from "./normalContext";
import toast from "react-hot-toast";

const States = (props) => {
  const [data, setData] = useState([]);
  const [gameDetails, setgameDetails] = useState([]);
  const [screenshots, setScreenshots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [genres, setGenres] = useState("");
  const [modes, setModes] = useState("");
  const [stores, setStores] = useState();
  const [next, setNext] = useState("");
  const [user, setUser] = useState({});
  const [previous, setPrevious] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [itemadded, setItemAdded] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const apikey = "a0fa87694c9e4a1b9b0967ad98a19a9b";
  const url = `https://api.rawg.io/api/games?`;
  const url2 = `https://api.rawg.io/api/games`;
  const backendurl = `https://games-app-cqn1.onrender.com/api/v3`;
  // const backendurl = `http://localhost:5000/api/v3`;

  const getgame = async (page, searchTerm, genres, modes) => {
    try {
      let apiUrl = `${url}key=${apikey}&page=${page}`;

      // If Date is included

      if (searchTerm) {
        apiUrl += `&search=${searchTerm}`;
      }

      // If Genres is Included

      if (genres) {
        apiUrl += `&genres=${genres}`;
      }

      // If Platforms is Included

      if (modes) {
        apiUrl += `&tags=${modes}`;
      }
      let response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }
      let data = await response.json();
      // console.log(data);
      // console.log(data.results);
      setData(data.results);
      setNext(data.next);
      setPrevious(data.previous);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };
  // console.log(isAuthenticated);
  const getgameDetails = useMemo(
    () => async (id, thing) => {
      setLoading(true);
      try {
        let apiUrl = `${url2}/${id}`;
        if (thing) {
          apiUrl += `/${thing}?key=${apikey}`;
        } else {
          apiUrl += `?key=${apikey}`;
        }

        // If Date is included

        let response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        let data = await response.json();
        setgameDetails(data);
        // console.log(data);

        if (thing === "screenshots") {
          setScreenshots(data);
          // console.log(data);
        }
        if (thing === "stores") {
          setStores(data);
          // console.log(data);
        }
        setNext(data.next);
        setPrevious(data.previous);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    },
    []
  );

  // const gameTrailer = useMemo(
  //   () => async (id) => {
  //     setLoading(true);
  //     try {
  //       let apiUrl = `${url2}/${id}?key=${apikey}`;

  //       // If Date is included

  //       let response = await fetch(apiUrl);
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok.");
  //       }
  //       let data = await response.json();
  //       setgameDetails(data);
  //       setNext(data.next);
  //       setPrevious(data.previous);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       setLoading(false);
  //     }
  //   },
  //   []
  // );

  const Register = async (name, email, password, pic) => {
    setLoading(true);
    let userdata;
    try {
      if (pic === "") {
        userdata = {
          name,
          email,
          password,
        };
      } else {
        userdata = {
          name,
          email,
          password,
          pic,
        };
      }

      let response = await fetch(`${backendurl}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userdata),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        localStorage.setItem("user", JSON.stringify(data));
        setIsAuthenticated(true);
        setUser(JSON.parse(localStorage.getItem("user")));
      }
      if (!response.ok) {
        toast.error(data.message);
      }
      setLoading(false);
      setRefresh(true);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      setIsAuthenticated(false);
    }
  };

  const Update = async (name, email, pic) => {
    setLoading(true);
    try {
      let response = await fetch(`${backendurl}/users/updateprofile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.user.token}`,
        },
        credentials: "include",
        body: JSON.stringify({
          name,
          email,
          pic,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        localStorage.setItem("user", JSON.stringify(data));
        setIsAuthenticated(true);
        setUser(JSON.parse(localStorage.getItem("user")));
        setLoading(false);
      }
      if (!response.ok) {
        toast.error(data.message);
        setLoading(false);
      }
      setLoading(false);
      setRefresh(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(error.message);
      setIsAuthenticated(false);
    }
  };

  const Login = async (email, password) => {
    setLoading(true);

    try {
      let response = await fetch(`${backendurl}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);

        localStorage.setItem("user", JSON.stringify(data));
        setIsAuthenticated(true);
        setUser(JSON.parse(localStorage.getItem("user")));
        setLoading(false);
      }
      if (!response.ok) {
        toast.error(data.message);
        setIsAuthenticated(false);
        setLoading(false);
      }
      setRefresh(true);
    } catch (error) {
      setIsAuthenticated(false);
      setLoading(false);
      toast.error(error.message);
    }
  };

  const GetMyProfile = async () => {
    setLoading(true);
    try {
      // toast.success(password);

      const data = JSON.parse(localStorage.getItem("user"));
      if (data) {
        setIsAuthenticated(true);
        setUser(data);
        setRefresh(true);
      }
      // toast.success(data.message);
      if (!data) {
        toast.error("Log in or Regsister First");
        setIsAuthenticated(false);
      }
      setRefresh(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
      setIsAuthenticated(false);
    }
  };

  const getItems = async (token) => {
    setLoading(true);

    try {
      let response = await fetch(`${backendurl}/wishlist`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setLoading(false);
        setWishlistItems(data.item);
      } else {
        toast.error("Failed To Fetch Items");
        setLoading(false);
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getCartItems = async (token) => {
    setLoading(true);

    try {
      let response = await fetch(`${backendurl}/cart`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setLoading(false);
        setCartItems(data.item);
      } else {
        toast.error("Failed To Fetch Cartitems");
        setLoading(false);
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeItem = async (game_id, thing) => {
    setLoading(true);

    if (!game_id) {
      toast.error("Item id Required");
      return;
    }

    try {
      let response = await fetch(`${backendurl}/${thing}/${game_id}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.user.token}`,
        },
      });

      if (thing === "wishlist") {
        getItems(user.user.token);
      } else {
        getCartItems(user.user.token);
      }

      const data = await response.json();

      if (response.ok) {
        toast.success(`Removed From ${thing} SuccessFully`);
        setLoading(false);
        setItemAdded(false);
      } else {
        toast.error(`Failed To Remove From ${thing}`);
        setLoading(false);
        setItemAdded(true);
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <Context.Provider
      value={{
        url,
        apikey,
        getgame,
        page,
        setPage,
        loading,
        setLoading,
        data,
        setData,
        searchTerm,
        setSearchTerm,
        genres,
        setGenres,
        modes,
        setModes,
        next,
        previous,
        Register,
        isAuthenticated,
        setIsAuthenticated,
        Login,
        refresh,
        GetMyProfile,
        user,
        getgameDetails,
        gameDetails,
        screenshots,
        Update,
        stores,
        backendurl,
        getItems,
        wishlistItems,
        removeItem,
        itemadded,
        setItemAdded,
        getCartItems,
        cartItems,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};

export default States;
