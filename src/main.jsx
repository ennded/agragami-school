import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import App from "./App.jsx";
import { ContentProvider } from "./content.jsx";
import "./styles.css";

// The shareable preview build runs inside a frame, so it keeps the page address in memory.
const Router = import.meta.env.VITE_PREVIEW === "1" ? MemoryRouter : BrowserRouter;

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <ContentProvider>
        <App />
      </ContentProvider>
    </Router>
  </React.StrictMode>
);
