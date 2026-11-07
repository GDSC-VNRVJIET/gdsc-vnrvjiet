import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./axiosConfig";
import App from "./App";
import IntroLoader from "./pages/IntroLoader";
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

const Index = () => {
  // The intro plays once per page load. The app renders underneath it from the
  // start, so the hero is laid out and the intro can land its logo onto it.
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      <Router>
        <App />
      </Router>
      {showIntro && <IntroLoader onDone={() => setShowIntro(false)} />}
    </>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
