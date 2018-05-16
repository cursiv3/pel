import React from "react";
import BarchartTotals from "../charts/BarchartTotals";
import PieDetailView from "../charts/PieDetailView";
import "./style.css";

class Race extends React.Component {
  render() {
    var colors = ["skyblue", "red", "blue", "orange", "purple", "darkgreen", "yellow"];
    return (
      <div className="race-panel-div">
        <h1>Race</h1>
        <div className="barchart-wrapper">
          <BarchartTotals
            data={this.props.barData}
            clickBar={this.props.clickBar}
            section={this.props.section}
          />
          <PieDetailView data={this.props.pieData} colors={colors} />
        </div>
      </div>
    );
  }
}

export default Race;
