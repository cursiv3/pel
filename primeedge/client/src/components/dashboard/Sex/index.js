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
import "./style.css";

const PieTooltip = props => {
  if (props.active) {
    var data = props.payload[0].payload;
    var pie = [
      { name: "male", value: props.payload[0].payload.male },
      { name: "female", value: props.payload[0].payload.female }
    ];

    return (
      <div className="custom-tooltip-wrapper">
        <p>Male - {data.male}</p>
        <p>Female - {data.female}</p>
        <PieChart width={400} height={300} style={{ display: "inline-table" }}>
          <Pie
            data={pie}
            cx={200}
            cy={150}
            outerRadius={120}
            fill="#8884d8"
            label={{ fill: "black" }}
          />
        </PieChart>
      </div>
    );
  }

  return null;
};

const Sex = props => {
  return (
    <div style={{ width: "100%" }}>
      <div className="sex-quarter-panel-div">
        <BarChart
          width={700}
          height={275}
          data={props.data}
          style={{ display: "inline-table" }}
          label={{ fill: "black" }}
          barSize={100}
        >
          <Bar dataKey="total" cx={0} cy={110} fill="skyblue" barSize={40} />
          <XAxis dataKey="quarter" />
          <YAxis />
          <Tooltip content={<PieTooltip />} />
        </BarChart>
      </div>
    </div>
  );
};

export default Sex;
