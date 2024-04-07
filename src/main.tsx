import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./app";
import "./index.css";
import { ThemeProvider } from "./lib/theme-provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
