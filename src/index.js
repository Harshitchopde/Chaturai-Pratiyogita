import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./reducers/store";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";


// // 🚨 Add the global handler here
// window.addEventListener("unhandledrejection", (event) => {
//   if (
//     event.reason?.type === "cancelation" ||
//     event.reason?.msg === "operation is manually canceled"
//   ) {
//     event.preventDefault(); // ignore Monaco cancelation errors
//   }
// });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
        <Toaster />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
