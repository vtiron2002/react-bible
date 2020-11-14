import React from "react";
import { render } from "react-dom";
import "regenerator-runtime/runtime";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import ContextProvider from "./store/Context";

render(
  <ContextProvider>
    <Router>
      <App />
    </Router>
  </ContextProvider>,
  document.querySelector("#root"),
);
