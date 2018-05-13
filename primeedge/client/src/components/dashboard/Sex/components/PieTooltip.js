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
  if (props.active) {
    const data = props.payload[0].payload;
    const pie = [
      { name: "male", value: data.male },
      { name: "female", value: data.female }
    ];

    const total = data.male + data.female;
    const malePercentage = (data.male / total * 100).toFixed(2);
    const femalePercentage = (data.female / total * 100).toFixed(2);

    return (
      <div>
        <h3>{data.quarter}</h3>
        <div className="sex-legend-male-val">
          <div className="sex-legend-male-color" />
          <div className="sex-legend-male-label">Male</div>
          <div className="sex-legend-male-int">{data.male}</div>
        </div>
        <div className="sex-legend-female-val">
          <div className="sex-legend-female-color" />
          <div className="sex-legend-female-label">Female</div>
          <div className="sex-legend-female-int">{data.female}</div>
        </div>
        <div className="pietooltip-percentage-male">{malePercentage}%</div>
        <div className="pietooltip-percentage-female">{femalePercentage}%</div>
        <PieChart width={200} height={200}>
          <Pie data={pie} dataKey="value" cx={100} cy={100} outerRadius={80}>
            <Cell fill="skyblue" />
            <Cell fill="pink" />
          </Pie>
        </PieChart>
      </div>
    );
  }
  return null;
};

export default PieTooltip;
