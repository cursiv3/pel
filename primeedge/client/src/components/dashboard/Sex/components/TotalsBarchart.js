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

const TotalsBarchart = props => {
  return (
    <div className="sex-barchart-wrapper">
      <BarChart
        width={800}
        height={275}
        margin={{ bottom: 25, top: 25, left: 25 }}
        data={props.data}
        style={{ display: "inline-table", verticalAlign: "middle" }}
        label={{ fill: "black" }}
        barSize={100}
      >
        <Tooltip content={<PieTooltip />} offset={80} />
        <Bar dataKey="total" cx={0} cy={110} fill="darkgreen" barSize={40} />
        <XAxis dataKey="quarter" tick={{ fontSize: "18px" }}>
          <Label value="Total Enrollees: Male + Female" position="bottom" />
        </XAxis>
        <YAxis>
          <Label value="Enrollee Amount" angle="-90" position="left" />
        </YAxis>
      </BarChart>
    </div>
  );
};

export default TotalsBarchart;
