import React from "react";
import Login from "./Login/Login";
import Dashboard from "./dashboard";
import "./main.css";

const App = () => {
  return (
    <div className="app-parent-div">
      <Login />
      <Dashboard />
    </div>
  );
};

export default App;
