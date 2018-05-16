import React from "react";
import BarchartTotals from "../charts/BarchartTotals";
import PieDetailView from "../charts/PieDetailView";
import "./style.css";

class AdmissionType extends React.Component {
  render() {
    var colors = ["red", "purple", "blue" ];
    return (
      <div className="admission-panel-div">
        <h1>Admission Type</h1>
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

export default AdmissionType;
