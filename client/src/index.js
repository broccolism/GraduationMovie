import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import "./styles/index.css";
import "./styles/Util.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./components/App";

ReactDOM.render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </BrowserRouter>,
  document.getElementById("root")
);
