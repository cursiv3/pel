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

class Payer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isTooltipActive: false
    };

    this.mouseEnter = this.mouseEnter.bind(this);
    this.mouseLeave = this.mouseLeave.bind(this);
  }

  mouseEnter() {
    this.setState({ isTooltipActive: true });
  }

  mouseLeave() {
    this.setState({ isTooltipActive: false });
  }

  render() {
    var data = this.props.data;

    var dataWithTotal = data.map(val => {
      var total = 0;

      for (var key in val) {
        if (typeof val[key] !== "string") {
          total += val[key];
        }
      }
      val.total = total;
      return val;
    });

    return (
      <div className="payer-panel-div">
        <h1>Payer</h1>
        <div className="payer-barchart-y-label">
          Amount<br />(People)
        </div>
        <ResponsiveContainer
          width={900}
          height={275}
          className="payer-barchart-wrapper"
        >
          <BarChart
            width={900}
            height={275}
            margin={{ bottom: 25, top: 25, left: 100 }}
            data={dataWithTotal}
            style={{ display: "inline-table", verticalAlign: "middle" }}
            label={{ fill: "black" }}
            barSize={100}
          >
            <Tooltip content={<PieTooltip />} position={{ x: 900, y: -26 }} />
            <Bar dataKey="total" cx={0} cy={110} fill="#022100" barSize={40} />
            <XAxis dataKey="quarter" tick={{ fontSize: "18px" }}>
              <Label value="Total Enrollees: Male + Female" position="bottom" />
            </XAxis>
            <YAxis />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default Payer;
