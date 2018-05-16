import React from "react";
import Sex from "./Sex";
import Payer from "./Payer";
import AdmissionType from "./Admission"
import Race from "./Race"
import "./style.css";

const data = require("./data.js");

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sex: null,
      payer: null,
      admission: null,
      race: null
    };

    this.clickBar = this.clickBar.bind(this);
  }

  clickBar(evt, section) {
    var barData = data[section].filter(entry => entry.quarter === evt.quarter);
    barData = barData[0];

    var pieData = [];
    for (var key in barData) {
      if (key !== "total" && key !== "quarter") {
        pieData.push({
          name: key,
          value: barData[key],
          quarter: barData.quarter,
          percent: (barData[key] / barData.total * 100).toFixed(2) + "%"
        });
      }
    }
    var newDataObj = {};
    newDataObj[section] = pieData;
    this.setState(Object.assign({}, this.state, newDataObj));
  }

  componentWillMount() {
      var initData = [];
      for (var field in data) {
          var pieData = [];
          for (var key in data[field][0]) {
            if (key !== "total" && key !== "quarter") {
              pieData.push( {
                name: key,
                value: data[field][0][key],
                quarter: data[field][0].quarter,
                percent: (data[field][0][key] / data[field][0].total * 100).toFixed(2) + "%"
              })
            }
          }
        initData.push(pieData);
    }
    this.setState({
      sex: initData[0],
      payer: initData[1],
      admission: initData[2],
      race: initData[3]
    });
  }

  render() {

    return (
      <div className="dashboard-wrapper">
        <Sex
          barData={data.sex}
          pieData={this.state.sex}
          clickBar={this.clickBar}
          section={"sex"}
        />

        <Payer
          barData={data.payer}
          pieData={this.state.payer}
          clickBar={this.clickBar}
          section={"payer"}
        />
        <AdmissionType barData={data.admission}
          pieData={this.state.admission}
          clickBar={this.clickBar}
          section={"admission"}
          />
          <Race barData={data.race}
          pieData={this.state.race}
          clickBar={this.clickBar}
          section={"race"}
          />
      </div>
    );
  }
}

export default Dashboard;
