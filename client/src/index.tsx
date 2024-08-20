import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Loader from "./pages/Loader";
import { BrowserRouter as Router } from 'react-router-dom';
import reportWebVitals from "./reportWebVitals";

const Index = () => {
  const [isAnimationCompleted, setIsAnimationCompleted] = useState(false);

  const handleAnimationComplete = () => {
    setIsAnimationCompleted(true);
  };

  return (
    <>
      {!isAnimationCompleted && (
        <Loader handleAnimationComplete={handleAnimationComplete} />
      )}
      <div
        className={`transition-opacity duration-500 ${
          isAnimationCompleted ? "opacity-100" : "opacity-0"
        }`}
      >
        {isAnimationCompleted && (
          <Router>
            <App />
          </Router>
        )}
      </div>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <Index />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
