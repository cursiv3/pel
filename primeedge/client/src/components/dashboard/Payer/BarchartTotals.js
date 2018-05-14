import React from "react";
import { Bar, BarChart, Cell, Label, XAxis, YAxis } from "recharts";

const BarchartTotals = props => {
  return (
    <div>
      <BarChart
        width={900}
        height={275}
        margin={{ bottom: 25, top: 25, left: 100 }}
        data={props.data}
        style={{ display: "inline-table", verticalAlign: "middle" }}
        label={{ fill: "black" }}
        barSize={100}
      >
        <Bar
          dataKey="total"
          cx={0}
          cy={110}
          fill="#022100"
          barSize={40}
          onMouseDown={evt => props.clickBar(evt)}
        />
        <XAxis dataKey="quarter" tick={{ fontSize: "18px" }}>
          <Label value="Total Enrollees: Male + Female" position="bottom" />
        </XAxis>
        <YAxis />
      </BarChart>
    </div>
  );
};

export default BarchartTotals;
