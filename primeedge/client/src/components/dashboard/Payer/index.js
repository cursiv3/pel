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

const Payer = props => {
  var barColors = ["red", "blue", "green", "yellow", "purple"];
  var data = props.data;

  var averages = {
    medcareAvg: 0,
    medaidAvg: 0,
    commAvg: 0,
    thirdAvg: 0,
    otherAvg: 0
  };

  data.forEach(el => {
    averages.medcareAvg += el.medicare;
    averages.medaidAvg += el.medicaid;
    averages.commAvg += el.commercial;
    averages.thirdAvg += el.thirdparty;
    averages.otherAvg += el.other;
  });

  var avgData = [];
  for (var key in averages) {
    averages[key] = Math.floor((averages[key] /= 12 + 0.5));
    var obj = {};
    obj[key] = averages[key];
    avgData.push({ name: key, value: averages[key] });
  }

  console.log("********", avgData);

  return (
    <div className="dash-section-wrap-div">
      <div className="payer-quarter-panel-div">
        <h3>{data.quarter}</h3>
        <BarChart
          width={600}
          height={300}
          data={avgData}
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
            {barColors.map(color => <Cell fill={color} />)}
          </Bar>
          <XAxis dataKey={"name"} />
          <YAxis dataKey={"value"} />
        </BarChart>
        <PieChart width={400} height={300} style={{ display: "inline-table" }}>
          <Pie
            data={avgData}
            cx={200}
            cy={150}
            outerRadius={120}
            fill="#8884d8"
            label={{ fill: "black" }}
          >
            {barColors.map(color => <Cell fill={color} />)}
          </Pie>
          <Tooltip itemStyle={{ color: "navy" }} />
        </PieChart>
      </div>
    </div>
  );
};

export default Payer;
