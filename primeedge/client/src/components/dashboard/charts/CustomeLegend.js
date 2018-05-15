import React from "react";
import "./style.css";

const CustomLegend = props => {
  return (
    <div className="custom-legend-wrapper">
      <table className="custom-legend-table">
        <tbody>
          {props.payload.map((entry, idx) => (
            <tr className="legend-data-row">
              <td>
                <div
                  className="legend-color-box"
                  style={{ backgroundColor: entry.color }}
                />
                {entry.value}
              </td>
              <td>{entry.payload.value}</td>
              <td>{entry.payload.percent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomLegend;
