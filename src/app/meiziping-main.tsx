import React from "react";
import ReactDOM from "react-dom";
import "../styles/tokens.css";
import "../styles/app.css";
import "../styles/travel.css";
import MeizipingPlan from "./MeizipingPlan";

ReactDOM.render(
  <React.StrictMode>
    <MeizipingPlan />
  </React.StrictMode>,
  document.getElementById("root")
);
