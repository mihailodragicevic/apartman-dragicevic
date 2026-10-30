import { hydrateRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import "./fonts.css";
import App from "./App.tsx";
import "./index.css";

hydrateRoot(document.getElementById("root")!,
  <>
    <App />
    <Analytics />
  </>,
);
