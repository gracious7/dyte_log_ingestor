import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Creating a root for rendering React elements
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendering the entire app within a StrictMode
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
