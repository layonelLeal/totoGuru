import React from "react";
import ReactDOM from "react-dom/client";
import Routs from "./routs/Routs.jsx";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <body className="dark">
        <Routs />
      </body>
    </AuthProvider>
  </React.StrictMode>
);
