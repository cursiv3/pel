import React from "react";
import Sex from "./Sex";
import Payer from "./Payer";

const data = require("./data.js");

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Patient Sex</h1>
        <Sex data={data.sex} />

        <h1>Payer</h1>
        <Payer data={data.payer} />
      </div>
    );
  }
}

export default Dashboard;
