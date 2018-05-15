import React from "react";
import BarchartTotals from "../charts/BarchartTotals";
import PieDetailView from "../charts/PieDetailView";
import "./style.css";

class Payer extends React.Component {
  render() {
    var colors = ["red", "blue", "navy", "orange", "purple"];
    return (
      <div className="payer-panel-div">
        <h1>Payer</h1>
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

export default Payer;
