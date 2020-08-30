import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./landing/App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();

// v1.5 also remove formLink from Event object

// v2: progress bar for hours. directly sign up user from other branches through website and allow admin panel to access. also let user select which branch first (in case other branches want to use this too :)).
