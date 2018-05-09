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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const LowMidHighPiechart = props => {
  var totalsArr = props.data.map(obj => {
    return obj.total;
  });

  totalsArr = totalsArr.sort();

  var lowMidHigh = [
    { name: "low", value: Math.min(...totalsArr) },
    { name: "mid", value: (totalsArr[5] + totalsArr[6]) / 2 },
    { name: "high", value: Math.max(...totalsArr) }
  ];
  return (
    <div className="sex-pie-lmh-wrapper">
      <PieChart
        width={225}
        height={225}
        style={{ display: "inline-table", verticalAlign: "middle" }}
        margin={{ top: 0, bottom: 0, left: 25 }}
      >
        <Tooltip />
        <Legend
          layout="vertical"
          wrapperStyle={{
            left: "100%",
            top: "50%",
            transform: "translate(100%, -50%)"
          }}
          dataKey="value"
        />
        <Pie
          data={lowMidHigh}
          dataKey="value"
          cx={100}
          cy={100}
          outerRadius={100}
          labelLine={false}
          label={renderCustomizedLabel}
        >
          <Cell fill="purple" />
          <Cell fill="orange" />
          <Cell fill="green" />
        </Pie>
      </PieChart>
    </div>
  );
};

export default LowMidHighPiechart;
