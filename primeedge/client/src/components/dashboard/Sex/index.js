import React from "react";
import "./style.css";
import TotalsBarchart from "./components/TotalsBarchart";
import LowMidHighPiechart from "./components/LowMidHighPiechart";

const Sex = props => {
  return (
    <div className="sex-panel-div">
      <h1>Patient Sex</h1>
      <TotalsBarchart data={props.data} />
    </div>
  );
};

export default Sex;
