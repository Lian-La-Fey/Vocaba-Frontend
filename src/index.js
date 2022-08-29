import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";

const token = localStorage.getItem("_accessToken");
const userPrefences = JSON.parse(localStorage.getItem("userPrefences"));
if (!userPrefences && !token) {
  localStorage.setItem("userPrefences", JSON.stringify({ theme: 0 }));
} else if (token && userPrefences.theme === 1) {
  document.body.classList.add("darkTheme")
} else if (token && userPrefences.theme === 0) {
  document.body.classList.remove("darkTheme")
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </>
);
