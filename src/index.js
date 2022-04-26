import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

const rand = Math.round(Math.random()) ? "X" : "O";

ReactDOM.render(<App player={rand} />, document.querySelector("#root"));
