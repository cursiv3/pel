import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Bar,
  BarChart,
  Legend,
  Tooltip,
  Cell,
  Label,
  XAxis,
  YAxis
} from "recharts";
import PieTooltip from "./PieTooltip";
import "./style.css";
import BarchartTotals from "./BarchartTotals";

class Payer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pieData: null
    };

    this.clickBar = this.clickBar.bind(this);
  }

  clickBar(evt) {
    var barData = this.props.data.filter(
      entry => entry.quarter === evt.quarter
    );
    barData = barData[0];

    var pieData = [];
    for (var key in barData) {
      if (key !== "total" && key !== "quarter") {
        pieData.push({
          name: key,
          value: barData[key],
          percent: (barData[key] / barData.total * 100).toFixed(2) + "%"
        });
      }
    }

    this.setState({ pieData: pieData });
  }

  render() {
    var data = this.props.data;

    var dataWithTotal = data.map(val => {
      var total = 0;
      val.total = 0;

      for (var key in val) {
        if (key !== "quarter") {
          total += val[key];
        }
      }
      val.total += total;
      return val;
    });

    return (
      <div className="payer-panel-div">
        <h1>Payer</h1>
        <div className="payer-barchart-wrapper">
          <BarchartTotals data={dataWithTotal} clickBar={this.clickBar} />
          <PieChart
            width={450}
            height={250}
            margin={{ right: 30, top: 55, bottom: 20, left: 10 }}
            style={{ display: "inline-table" }}
          >
            <Pie
              data={this.state.pieData}
              dataKey="value"
              cx={140}
              cy={60}
              outerRadius={80}
              animationDuration={800}
              label
            />
            <Legend />
          </PieChart>
        </div>
      </div>
    );
  }
}

export default Payer;
