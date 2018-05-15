import React from "react";
import {
  Bar,
  BarChart,
  Cell,
  Label,
  LabelList,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const BarchartTotals = props => {
  var dataWithTotal = props.data.map(val => {
    var total = 0;
    val.total = 0;

    for (var key in val) {
      if (key !== "quarter") {
        total += val[key];
      }
    }
    val.total += total;
    return val;
  });

  return (
    <div style={{ display: "inline-table", verticalAlign: "middle" }}>
      <BarChart
        width={900}
        height={275}
        margin={{ bottom: 25, top: 25, left: 100 }}
        data={dataWithTotal}
        label={{ fill: "black" }}
        barSize={100}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <Bar
          dataKey="total"
          cx={0}
          cy={110}
          fill="#022100"
          barSize={40}
          onMouseEnter={evt => props.clickBar(evt, props.section)}
        >
          <LabelList dataKey="total" position="top" fill="#022100" />
        </Bar>

        <XAxis dataKey="quarter" tick={{ fontSize: "18px" }} />
        <YAxis />
      </BarChart>
    </div>
  );
};

export default BarchartTotals;
