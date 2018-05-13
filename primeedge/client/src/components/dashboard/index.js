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
        <Sex data={data.sex} />

        <Payer data={data.payer} />
      </div>
    );
  }
}

export default Dashboard;
