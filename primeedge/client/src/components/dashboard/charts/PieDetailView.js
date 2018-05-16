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
  LabelList,
  XAxis,
  YAxis
} from "recharts";
import CustomLegend from "./CustomeLegend";

const PieDetailView = props => {
  return (
    <div style={{ display: "inline-table", verticalAlign: "middle" }}>
      <h3
        style={{
          padding: "0",
          margin: "0",
          position: "relative",
          left: "10%"
        }}
      >
        {props.data !== null ? props.data[0].quarter : null}
      </h3>
      <PieChart
        width={450}
        height={250}
        margin={{ right: 30, top: 55, bottom: 20, left: 10 }}
      >
      <Tooltip />
        <Pie
          data={props.data}
          dataKey="value"
          cx={160}
          cy={60}
          outerRadius={80}
          animationBegin={0}
          animationDuration={600}
        >
          {typeof props.colors === "object"
            ? props.colors.map(color => <Cell key={color} fill={color} />)
            : null}
        </Pie>
        {props.data !== null ? (
          <Legend
            content={<CustomLegend />}
            verticalAlign="top"
            align="right"
            layout="vertical"
            wrapperStyle={{ left: "60%" }}
            width={300}
          />
        ) : null}
      </PieChart>
    </div>
  );
};

export default PieDetailView;
