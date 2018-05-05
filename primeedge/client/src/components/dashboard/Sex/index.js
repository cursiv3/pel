import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  Tooltip,
  Cell,
  Label
} from "recharts";

const Sex = props => {
  return (
    <div style={{ width: "100%" }}>
      {props.data.map(val => (
        <div
          style={{
            display: "inline-table",
            width: "16%",
            fontSize: "initial",
            borderRadius: "5px",
            textAlign: "center"
          }}
        >
          <h3>{val.quarter}</h3>
          <PieChart width={300} height={140}>
            <Pie
              data={val.sex}
              cx={150}
              cy={70}
              outerRadius={40}
              fill="#8884d8"
              label={{ fill: "black" }}
            >
              <Cell fill={"skyblue"} />
              <Cell fill={"pink"} />
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      ))}
    </div>
  );
};

export default Sex;
