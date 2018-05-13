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
  YAxis,
  LabelList
} from "recharts";
import PieTooltip from "./PieTooltip";

class TotalsBarchart extends React.Component {
  render() {
    return (
      <div className="sex-barchart-wrapper">
        <BarChart
          width={800}
          height={275}
          margin={{ bottom: 25, top: 25, left: 40 }}
          data={this.props.data}
          style={{ display: "inline-table", verticalAlign: "middle" }}
          label={{ fill: "black" }}
          barSize={100}
        >
          <Tooltip content={<PieTooltip />} position={{ x: 820, y: -85 }} />
          <Bar dataKey="total" cx={0} cy={110} fill="#022100" barSize={40} />
          <XAxis dataKey="quarter" tick={{ fontSize: "18px" }}>
            <Label value="Total Enrollees: Male + Female" position="bottom" />
          </XAxis>
          <YAxis>
            <Label
              value="Amount (enrollees)"
              position="insideBottomLeft"
              offset={-5}
              angle={-90}
            />
          </YAxis>
        </BarChart>
      </div>
    );
  }
}

export default TotalsBarchart;
