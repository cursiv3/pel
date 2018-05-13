import React from "react";
import "./style.css";
import TotalsBarchart from "./components/TotalsBarchart";

const Sex = props => {
  return (
    <div className="sex-panel-div">
      <h1>Patient Sex</h1>
      <TotalsBarchart data={props.data} />
    </div>
  );
};

export default Sex;
