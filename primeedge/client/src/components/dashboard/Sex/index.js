import React from "react";
import BarchartTotals from "../charts/BarchartTotals";
import PieDetailView from "../charts/PieDetailView";
import "./style.css";

const Sex = props => {
  var colors = ["skyblue", "pink"];
  return (
    <div className="sex-panel-div">
      <h1>Patient Sex</h1>
      <div className="barchart-wrapper">
        <BarchartTotals
          data={props.barData}
          clickBar={props.clickBar}
          section={props.section}
        />
        <PieDetailView data={props.pieData} colors={colors} />
        <p>this is my axis label</p>
      </div>
    </div>
  );
};

export default Sex;
