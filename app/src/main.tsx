import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="app-container">
      <h1>testing</h1>
    </div>
  </StrictMode>,
);
