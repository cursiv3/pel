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
import "./style.css";

const Sex = props => {
  return (
    <div style={{ width: "100%" }}>
      {props.data.map(val => (
        <div class="sex-quarter-panel-div">
          <h3>{val.quarter}</h3>
          <BarChart
            width={200}
            height={140}
            data={val.sex}
            style={{ display: "inline-table" }}
            label={{ fill: "black" }}
          >
            <Bar
              dataKey="value"
              cx={0}
              cy={110}
              fill="pink"
              label={{ fill: "black" }}
            >
              <Cell fill={"skyblue"} />
              <Cell fill={"pink"} />
            </Bar>
            <XAxis dataKey={"name"} />
            <YAxis dataKey={"value"} />
          </BarChart>
          <PieChart
            width={200}
            height={150}
            style={{ display: "inline-table" }}
          >
            <Pie
              data={val.sex}
              cx={100}
              cy={70}
              outerRadius={40}
              fill="#8884d8"
              label={{ fill: "black" }}
            >
              <Cell fill={"skyblue"} />
              <Cell fill={"pink"} />
            </Pie>
            <Tooltip itemStyle={{ color: "navy" }} />
          </PieChart>
        </div>
      ))}
    </div>
  );
};

export default Sex;
