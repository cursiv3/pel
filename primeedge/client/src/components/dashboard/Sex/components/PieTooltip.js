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

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieTooltip = props => {
  if (props.active) {
    var data = props.payload[0].payload;
    var pie = [
      { name: "male", value: data.male },
      { name: "female", value: data.female }
    ];

    return (
      <div className="custom-tooltip-wrapper">
        <h3>{data.quarter}</h3>
        <div className="sex-legend-male-val">
          <div className="sex-legend-male-color" />
          <div className="sex-legend-male-label">Male</div>
          {data.male}
        </div>
        <PieChart width={200} height={200}>
          <Pie
            data={pie}
            dataKey="value"
            cx={100}
            cy={100}
            outerRadius={80}
            labelLine={false}
            label={renderCustomizedLabel}
          >
            <Cell fill="skyblue" />
            <Cell fill="pink" />
          </Pie>
        </PieChart>
        <div className="sex-legend-female-val">
          <div className="sex-legend-female-color" />
          <div className="sex-legend-female-label">Female</div>
          {data.female}
        </div>
      </div>
    );
  }
  return null;
};

export default PieTooltip;
