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
import barchartLabel from "./barchartLabel";

class TotalsBarchart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null,
      isActive: false
    }
    this.onMouseHover = this.onMouseHover.bind(this);
  }

  onMouseHover(data) {
    this.setState({
      values: data
    });
  }

  render() {
    return (
      <div className="sex-barchart-wrapper">
        <BarChart
          width={800}
          height={275}
          margin={{ bottom: 25, top: 25, left: 25 }}
          data={this.props.data}
          style={{ display: "inline-table", verticalAlign: "middle" }}
          label={{ fill: "black" }}
          barSize={100}
        >
          <Tooltip content={<barchartLabel state={this.state} onMouseHover={this.onMouseHover} />} />
          <Bar dataKey="total" cx={0} cy={110} fill="darkgreen" barSize={40} />
          <XAxis dataKey="quarter" tick={{ fontSize: "18px" }}>
            <Label value="Total Enrollees: Male + Female" position="bottom" />
          </XAxis>
          <YAxis>
            <Label value="Enrollee Amount" angle={-90} position="left" />
          </YAxis>
        </BarChart>
        <PieTooltip state={this.state} onMouseHover={this.onMouseHover} />
      </div>
    );
  }
};

export default TotalsBarchart;
