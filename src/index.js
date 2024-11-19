import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DatabaseContextProvider } from "./context/DatabaseContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DatabaseContextProvider>
      <App />
    </DatabaseContextProvider>
  </React.StrictMode>
);
