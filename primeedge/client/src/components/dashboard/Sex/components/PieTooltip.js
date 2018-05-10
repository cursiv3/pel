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


const PieTooltip = props => {
  if (props.state.isActive) {

    return (
      <div className="custom-tooltip-wrapper">
        <h3>{props.state.data.quarter}</h3>
        <div className="sex-legend-male-val">
          <div className="sex-legend-male-color" />
          <div className="sex-legend-male-label">Male</div>
          {props.state.data.male}
        </div>
        <PieChart width={200} height={200}>
          <Pie
            data={props.state.data}
            dataKey="value"
            cx={100}
            cy={100}
            outerRadius={80}
          >
            <Cell fill="skyblue" />
            <Cell fill="pink" />
          </Pie>
        </PieChart>
        <div className="sex-legend-female-val">
          <div className="sex-legend-female-color" />
          <div className="sex-legend-female-label">Female</div>
          {props.state.data.female}
        </div>
      </div>
    );
  }
  return null;
};

export default PieTooltip;
