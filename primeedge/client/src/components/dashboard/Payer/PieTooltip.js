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
import CustomLabel from "./CustomLabel";

const CustomLegend = props => {
  return (
    <div>
      <h3 className="payer-legend-h3">{props.quarter}</h3>
      <table>
        <tbody>
          {props.payload.map(val => (
            <tr key={val.payload.name} style={{ textAlign: "left" }}>
              <td
                style={{
                  width: "15px",
                  height: "15px",
                  backgroundColor: val.color,
                  display: "inline-table",
                  margin: "0 5px 0 0"
                }}
              />
              <td>{val.value}</td>
              <td style={{ width: "20px" }} />
              <td>{val.payload.percent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PieTooltip = props => {
  var colors = ["red", "orange", "purple", "navy", "darkgreen"];

  if (!props.active) {
    return null;
  }

  const data = props.payload[0].payload;
  var pieData = [];
  var total = 0;
  var quarter = data.quarter;

  for (var key in data) {
    if (key === "total") {
      total += data[key];
    }
  }

  for (var key in data) {
    if (key !== "total" && key !== "quarter") {
      pieData.push({
        name: key,
        value: data[key],
        percent: (data[key] / total * 100).toFixed(2) + "%"
      });
    }
  }

  return (
    <div>
      <PieChart
        width={450}
        height={250}
        margin={{ right: 30, top: 55, bottom: 20, left: 10 }}
      >
        <Pie
          data={pieData}
          dataKey="value"
          cx={140}
          cy={60}
          outerRadius={80}
          animationBegin={200}
          animationDuration={1500}
          label
        >
          {colors.map(color => <Cell key={color} fill={color} />)}
        </Pie>
        <Legend
          content={<CustomLegend quarter={quarter} />}
          wrapperStyle={{ left: "100%", transform: "translateX(-25%)" }}
          verticalAlign="bottom"
        />
      </PieChart>
    </div>
  );
};

export default PieTooltip;
