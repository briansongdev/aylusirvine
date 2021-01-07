import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./landing/App";
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.min.css";
import "./fonts/DINRoundPro.ttf";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import HttpsRedirect from "react-https-redirect";

ReactDOM.render(
  <HttpsRedirect>
    <MemoryRouter>
      <App />
    </MemoryRouter>
  </HttpsRedirect>,
  document.getElementById("root")
);

serviceWorker.unregister();

// v1.5 add pvsa render based on how many hours they have + supportive messages

// v2: progress bar for hours. directly sign up user from other branches through website and allow admin panel to access. also let user select which branch first (in case other branches want to use this too :)).
