import React from "react";
import ReactDOM from "react-dom";
import States from "./context/States";

import App from "./App";

import "./App.css";

ReactDOM.render(
  <States>
    <App />
  </States>,
  document.getElementById("root")
);
